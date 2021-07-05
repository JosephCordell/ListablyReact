import './App.css';
import Header from './components/Header';
import Homepage from './views/Homepage';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './views/SignUp'
import React from 'react';

const App =  () => {
  return (

    <React.Fragment>
  <Header />
  <Switch> 
    <Route exact path='/signup' component={SignUp} />
    <Route path = '/' component={Homepage} />
  </Switch>
  </React.Fragment>
    )
}



export default App;
