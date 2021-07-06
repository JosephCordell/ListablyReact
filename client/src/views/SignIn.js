import React from 'react';

export default function SignIn() {

    

    return (
        <React.Fragment>
            <div className={'container-user'}>
                <h2>Login</h2>

                <form className={'loginform'}>
                    <div className={'form-group'}>
                        <label for="email">Email: </label>
                        <input type="email" id="email" name="username" className={'form-control form-control-sm login-input'} placeholder="Enter Email" />
                    </div>
                    <div className={'form-group'}>
                        <label for="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={'form-control form-control-sm login-input'}
                            placeholder="Enter Password"
                        />
                    </div>
                    <div className={'submit-button'}>
                        <button type="submit" className={'btn btn-primary btn-block'}>
                            Login
                        </button>
                    </div>
                </form>
            </div>

            <div style="text-align: center;">
                Don't have an account?
                <a href="/signup" style="color:blue;">
                    Sign up!
                </a>
            </div>

            <script src="/js/login.js"></script>
        </React.Fragment>
    );
}
