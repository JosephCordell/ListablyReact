import './App.css';
import Header from './components/Header';
import Homepage from './views/Homepage';
import { Route, Switch/* , Redirect */ } from 'react-router-dom';
import SignUp from './views/SignUp'
import SearchResults from './views/SearchResults'
import React from 'react';
import TrendingMovies from './views/TrendingMovies';

const App =  () => {
  return (

    <React.Fragment>
  <Header />
  <Switch> 

    <Route exact path='/trending-movies' component={TrendingMovies} />
    <Route exact path='/signup' component={SignUp} />
    <Route path='/results' component={SearchResults} />
    <Route path = '/' component={Homepage} />
  </Switch>
  </React.Fragment>
    )
}



export default App;
