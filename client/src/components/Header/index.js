import React from 'react';
import SearchBar from '../SearchBar';
import './style.css';

const Header = ({user, setUser}) => {
    const loggedIn = false;


    return (
        <nav className={'navbar navbar-expand-lg navbar-light'} style={{ backgroundColor: '#e3f2fd' }}>
            <div className={'container-fluid'}>
                <a className={'navbar-brand'} href="/">Listably</a>
                <button
                    className={'navbar-toggler'}
                    type={'button'}
                    data-bs-toggle={'collapse'}
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className={'navbar-toggler-icon'}></span>
                </button>
                <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav'}>
                        <li className={'nav-item'}>
                            <a className={'nav-link'}  href="/trending-movies" >Movies</a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'}   href="/trending-tv" >TV Shows</a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'}   href="/user" >My Lists</a>
                        </li>
                    </ul>
                </div>
                <SearchBar user = {user} setUser = {setUser}/>
            </div>

            {loggedIn ? (
                <div className={'login'}>
                    <div className={'collapse navbar-collapse'} classID={'navbarNav'}>
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href="/user">
                                    User
                                </a>
                            </li>

                            <li className={'nav-item'}>
                                <a className={'nav-link'} href="/" classID={'logout'}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={'login'}>
                    <div className={'collapse navbar-collapse'} classID={'navbarNav'}>
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href={'/login'}>
                                    Login
                                </a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href={'/signup'}>
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
