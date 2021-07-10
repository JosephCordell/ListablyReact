import React, { useState } from 'react';
import useForm from '../js/useForm';
import validate from '../js/validateInfo';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const { handleChange, values, handleSubmit, errors } = useForm(validate);

    return (
        <React.Fragment>
            {/*       <div id='myModal' className={'modal hide'}>
        <div className={'modal-content'}>
          <div className={'modal-header'}>
            <span id='modal-close' className={'close'}>
              &times;
            </span>
            <h2>Error</h2>
          </div>
          <div className={'modal-body'}>
            <p>Email already in use or password less than 8 characters</p>
          </div>
        </div>
      </div> */}

            <div className={'container-user'}>
                <h2>Signup</h2>

                <form className={'form signup-form'} onSubmit={handleSubmit}>
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
                            value={values.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p>{errors.username}</p>}
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
                            value={values.password2}
                            onChange={handleChange}
                        />
                        {errors.password2 && <p>{errors.password2}</p>}
                    </div>

                    <div className={'submit-button'}>
                        <button className={'btn btn-primary'} type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ 'text-align': 'center' }}>
                Have an account?{' '}
                <a href="/login" style={{ color: 'blue;' }}>
                    Sign in!
                </a>
            </div>
        </React.Fragment>
    );
}
