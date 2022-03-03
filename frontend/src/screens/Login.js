import { useState, useEffect } from 'react';

import { validateLogin, login, isLoggedIn } from '../utils/auth'

import Alert from '../components/Alert';
import Page from '../components/Page';

export default function Login() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState({
        error: false,
        text: ''
    });

    useEffect(() => {
        if (isLoggedIn()) {
            // Redirect to user area
            
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const message = validateLogin(username);

        if (message.error) {
            setMessage(message);
        }
        else {
            login(username);
        }
    }

    return (
        <Page title="Login">
            {
                message.text ?
                    <Alert
                        text={message.text}
                        type={ message.error ? 'danger' : '' } /> :
                    null
            }
            <form
                className="form login-form"
                onSubmit={onSubmit}>

                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        autoComplete="off"
                        required
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }} />
                </div>

                <div className="form-group">
                    <button
                        className="btn btn-lg btn-primary"
                        disabled={username.length < 4}>Log In</button>
                </div>
            </form>
        </Page>
    );
}