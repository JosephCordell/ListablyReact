import './App.css';
import React from 'react';
import Header from './components/Header';
import Homepage from './views/Homepage';
import { Route, Switch/* , Redirect */ } from 'react-router-dom';
import SignUp from './views/SignUp'
import TrendingMovies from './views/TrendingMovies';
import Login from './views/Login'
import TrendingTv from './views/TrendingTv';

const App =  () => {
  return (

    <React.Fragment>
  <Header />
  <Switch> 
    <Route exact path='/trending-movies' component={TrendingMovies} />
    <Route exact path='/trending-tv' component={TrendingTv} />
    <Route exact path='/signup' component={SignUp} />
    <Route exact path='/login' component={Login} />
    <Route path = '/' component={Homepage} />
  </Switch>
  </React.Fragment>
    )
}



export default App;
