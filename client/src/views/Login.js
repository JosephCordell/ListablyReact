import React, { useState } from 'react';
import useForm from '../js/useForm';
import validate from '../js/loginValidate';

export default function SignIn() {


    const { handleChange, values, handleLogIn, errors } = useForm(validate);

    return (
        <React.Fragment>
            <div className='container-user'>
                <h2>Login</h2>

                <form className='loginform' onSubmit={handleLogIn}>
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
                            value={values.email}
                            onChange={handleChange}
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
                            value={values.password}
                            onChange={handleChange}
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

            <div style={{ 'text-align': 'center' }}>
                Don't have an account?{' '}
                <a href="/signup" style={{ color: 'blue;' }}>
                    Sign up!
                </a>
            </div>

            <script src="/js/login.js"></script>
        </React.Fragment>
    );
}
