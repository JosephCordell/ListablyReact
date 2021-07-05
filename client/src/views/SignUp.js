import React, { useState } from 'react';

export default function SignUp() {
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
}
