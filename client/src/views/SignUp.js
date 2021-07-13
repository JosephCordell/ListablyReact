import React, { useState } from 'react';
import validate from '../js/signUpValidate';

export default function SignUp() {
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

  return (
    <React.Fragment>
      <div id='myModal' className={'modal hide'}>
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
      </div>

      <div className={'container-user'}>
        <h2>Signup</h2>

        <form className={'form signup-form'}>
          <div className={'form-group'}>
            <label for='name-signup'>name:</label>
            <input className={'form-input'} value ={name} onChange={(event) => setName(event.target.value)} type='text' id='name-signup' />
          </div>
          <div className={'form-group'}>
            <label for='email-signup'>email:</label>
            <input className={'form-input'} value ={email} onChange={(event) => setEmail(event.target.value)} type='text' id='email-signup' />
          </div>
          <div className={'form-group'}>
            <label for='password-signup'>password:</label>
            <input className={'form-input'} value ={password} onChange={(event) => setPassword(event.target.value)} type='password' id='password-signup' />
          </div>
          <div className={'submit-button'}>
            <button className={'btn btn-primary'} type='submit'>
              Sign Up
            </button>
          </div>
        </form>
      </div>

    </React.Fragment>
  );
=======
>>>>>>> Stashed changes
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({})
    const [hideModal, setHideModal] = useState(true)

    const handleSignUp = (e) => {
        e.preventDefault()

        const fetchData = async () => {
            console.log(username, email, password);
            const response = await fetch('/api/users/signup', {
                    method: 'POST',
                    body: JSON.stringify({ username, email, password }),
                    headers: { 'Content-type': 'application/json' },
                });
    
                if (response.ok) {
<<<<<<< Updated upstream
                    localStorage.setItem(`loggedIn`, true);
                    localStorage.setItem(`token`, response.data.token )
                    document.location.replace('/user');
=======
                    console.log(response);
                    localStorage.setItem(`loggedIn`, true);
                    //localStorage.setItem(`token`, response.data.token )
                    //document.location.replace('/user');
>>>>>>> Stashed changes
                } else {
                    setHideModal(false)
                    return;
                }  
        };
        const response = validate({ username, email, password, password2 });
        setErrors(response)
        if (Object.keys(response).length > 0) {
        } else {
            fetchData();
        }
    };



    return (
        <React.Fragment>
            <div id="myModal" className={hideModal ? 'modal hide': 'modal'}>
                <div className={'modal-content'}>
                    <div className={'modal-header'}>
                        <span id="modal-close" className={'close'} onClick={()=> setHideModal(true)}>
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
                        {errors.password2 && <p>{errors.password2}</p>}
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
                <a href="/login" style={{ color: 'blue' }}>
                    Sign in!
                </a>
            </div>
        </React.Fragment>
    );
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}
