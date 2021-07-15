import React, { useState } from 'react';
import validate from '../js/loginValidate';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [hideModal, setHideModal] = useState(true);

    const loginFormHandler = async (event) => {
        event.preventDefault();

        const fetchData = async () => {
            console.log(email, password);
            await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': 'application/json' },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    localStorage.setItem(`loggedIn`, true);
                    localStorage.setItem(`token`, data.token);
                    localStorage.setItem('todo', data.todo)
                    localStorage.setItem('rating', data.ratings)
                   document.location.replace('/user');
                })
                .catch((err) => {
                    console.log(err);
                    setHideModal(false);
                });
        };

        const response = validate({ email, password });
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
                        <p>Email or password incorrect</p>
                    </div>
                </div>
            </div>
            <div className="container-user">
                <h2>Login</h2>

                <form className="loginform" onSubmit={loginFormHandler}>
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
                        {errors.email && <p>{errors.email}</p>}
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
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <div className={'submit-button'}>
                        <button type="submit" className={'btn btn-primary btn-block'}>
                            Login
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <a href="/signup" style={{ color: 'blue' }}>
                    Sign up!
                </a>
            </div>
        </React.Fragment>
    );
}
