import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  } from "react-router-dom";
import Login from './Login/LoginForm'
import EventId from './EventId/eventId'
import Register from './Register/RegisterForm'
import ProfileForm from './Profile/ProfileForm'
import EventsIndex from './Events/EventsIndex';
import Main from './Main';
import { useState } from 'react';

export default function App(props) {
  const [islogin, setisLogin] = useState(false) 
  //Create useffect hook to get user info 

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
          <Route exact path='/events'>
            {islogin ? <EventsIndex /> : <Redirect to="/login" />}
          </Route>
          <Route exact path='/events/:eventId' > 
          <EventId />
          </Route > 
        </Switch>
      </Router>
    </div>
    
  );
}

