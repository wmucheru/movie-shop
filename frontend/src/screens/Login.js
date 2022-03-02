import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        alert(username);
    }

    return (
        <>
            <form
                class="form login-form"
                onSubmit={onSubmit}>

                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        required
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }} />
                </div>

                <div className="form-group">
                    <button className="btn btn-lg btn-primary">Log In</button>
                </div>
            </form>
        </>
    );
}