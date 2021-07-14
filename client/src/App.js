import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Homepage from './views/Homepage';
import { Route, Switch /* , Redirect */ } from 'react-router-dom';
import SignUp from './views/SignUp';
import SearchResults from './views/SearchResults';
import TrendingMovies from './views/TrendingMovies';
import Login from './views/Login';
import TrendingTv from './views/TrendingTv';
import User from './views/User';
import Footer from './components/Footer'; 
import axios from 'axios';

const App = () => {
    const [user, setUser] = useState({
        query: '',
        searchLoad: true,
        loggedIn: localStorage.getItem('loggedIn'),
    });

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('loggedIn') !== 'true') {
            axios.post('/api/users/login', {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
                if (response.status === 200) {
                    setUser({ ...user, loggedIn: response.data.logged_in });
                    localStorage.setItem(`loggedIn`, true);
                } else {
                    setUser({ ...user, loggedIn: false });
                    localStorage.removeItem(`loggedIn`);
                }
            });
        }
    }, []);

    return (
        <React.Fragment>
            <Header user={user} setUser={setUser} loggedIn={user.loggedIn} />
            <Switch>
                <Route exact path="/trending-movies" component={TrendingMovies} />
                <Route exact path="/trending-tv" component={TrendingTv} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/user" component={User} />
                <Route path="/results">
                    <SearchResults user={user} setUser={setUser} />
                </Route>
                <Route path="/" component={Homepage} />
            </Switch>
            <Footer />
        </React.Fragment>
    );
};

export default App;
