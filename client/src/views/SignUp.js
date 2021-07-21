import React, { useState } from 'react';
import validate from '../js/signUpValidate';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});
    const [hideModal, setHideModal] = useState(true);

    const handleSignUp = (e) => {
        e.preventDefault();

        const fetchData = async () => {
            await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-type': 'application/json' },
            })
                .then((response) => {
                    if (response.status === 200) { response.json() }
                    else {
                        throw new Error('email in use')
                    }
                })
                .then((data) => {
                    localStorage.setItem(`loggedIn`, true);
                    localStorage.setItem(`token`, data.token);
                    localStorage.setItem('todo', null);
                    localStorage.setItem('ratings', null);
                    document.location.replace('/user');
                })
                .catch((err) => {
                    console.log(err);
                    setHideModal(false);
                });
        };
        const response = validate({ username, email, password, password2 });
        setErrors(response);
        if (Object.keys(response).length > 0) {
        } else {
            fetchData();
        }
    };

    return (
        <React.Fragment>
            <div id="myModal" className={hideModal ? 'modal hide' : 'modal'}>
                <div className={'modal-content'}>
                    <div className={'modal-header'}>
                        <span id="modal-close" className={'close'} onClick={() => setHideModal(true)}>
                            &times;
                        </span>
                        <h2>Error</h2>
                    </div>
                    <div className={'modal-body'}>
                        <p>Email already in use</p>
                    </div>
                </div>
            </div>

            <div className={'container-user'}>
                <h2>Signup</h2>

                <form className={'form signup-form'} onSubmit={(e) => handleSignUp(e)}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            className="form-input"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Confirm Password:
                        </label>
                        <input
                            id="password2"
                            type="password"
                            name="password2"
                            className="form-input"
                            placeholder="Re-enter your password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        {errors.password2 && <p className="error">{errors.password2}</p>}
                    </div>

                    <div className={'submit-button'}>
                        <button className={'btn btn-primary'} type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ textAlign: 'center' }}>
                Have an account?{' '}
                <a href="/login" className={'special-link-small'}>
                    Sign in!
                </a>
            </div>
        </React.Fragment>
    );
}
