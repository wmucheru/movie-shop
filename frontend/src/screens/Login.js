import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateLogin, login, isLoggedIn, isAdmin } from '../utils/auth';

import Alert from '../components/Alert';
import Page from '../components/Page';

export default function Login() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState({
        error: false,
        text: ''
    });

    let navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            const redirectUrl = isAdmin() ? '/admin' : '/movies';
            navigate(redirectUrl);
        }
    }, [navigate]);

    const onSubmit = (e) => {
        e.preventDefault();
        const message = validateLogin(username);

        if (message.error) {
            setMessage(message);
        }
        else {
            const redirectURL = login(username);
            navigate(redirectURL);
        }
    }

    return (
        <Page title="Login" bodyClass="login-bd">
            <div className="login-box">
                <h1>Login</h1>

                {
                    message.text ?
                        <Alert
                            text={message.text}
                            type={ message.error ? 'danger' : '' } /> :
                        null
                }

                <form
                    className="form"
                    onSubmit={onSubmit}>

                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="form-control"
                            autoComplete="off"
                            autoFocus
                            required
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }} />
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-lg btn-block btn-primary"
                            disabled={username.length < 4}>Log In</button>
                    </div>
                </form>
            </div>
        </Page>
    );
}