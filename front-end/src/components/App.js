import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  } from "react-router-dom";
import Login from './Login/LoginForm'
import Register from './Register/RegisterForm'
import ProfileForm from './Profile/ProfileForm'
import EventsIndex from './Events/EventsIndex';
import Navigation from './Navigation/Navigation'
import Main from './Main';
import { useState } from 'react';

export default function App(props) {
  const [islogin, setisLogin] = useState(false)

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/login'>
            <Login 
            islogin ={islogin}
            setisLogin = {setisLogin} />
          </Route>
          <Route path='/register'>
            <Register />
          </Route> 
          <Route path='/profile'>
            <ProfileForm /> 
          </Route>
          <Route path='/events'>
            <EventsIndex /> 
          </Route>
         
        </Switch>
      </Router>
    </div>
    
  );
}

