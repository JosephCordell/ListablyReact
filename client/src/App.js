import './App.css';
import Header from './components/Header';
import Homepage from './views/Homepage';
import { Route, Switch /* , Redirect */ } from 'react-router-dom';
import SignUp from './views/SignUp';
import SearchResults from './views/SearchResults';
import React, { useState } from 'react';
import TrendingMovies from './views/TrendingMovies';
import TrendingTv from './views/TrendingTv';

const App = () => {
    const [user, setUser] = useState({
        query: '',
        searchLoad: true
    });


    return (
        <React.Fragment>
            <Header user={user} setUser={setUser} />
            <Switch>
                <Route exact path="/trending-movies" component={TrendingMovies} />
                <Route exact path="/trending-tv" component={TrendingTv} />
                <Route exact path="/signup" component={SignUp} />
                <Route path="/results" >
                  <SearchResults user={user} setUser={setUser}/>
                </Route>
                <Route path="/" component={Homepage} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
