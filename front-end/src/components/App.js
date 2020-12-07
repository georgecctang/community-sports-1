
import './App.scss';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import Login from './Login/LoginForm'
import EventId from './EventId/eventId'
import Register from './Register/RegisterForm'
import EventsIndex from './Events/EventsIndex';
import MyEventsIndex from './MyEvents/MyEventsIndex';
import Message from './Message/Message';
import Main from './Main/Main';
import EditEvent from './Events/EditEvent'
import CreateEvent from './Events/CreateEvent'
import { useState , useEffect } from 'react';

import useLocalStorage from "../hooks/useLocalStorage";
import './App.scss';

export default function App(props) {


  const [user, setUser] = useLocalStorage('user', "");


  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/login'>
            <Login  />
          </Route>
          <Route path='/register'>
            <Register />
          </Route> 
          <Route exact path='/events' > 
           <EventsIndex/> 
          </Route>

          <Route exact path='/messages' >
          <Message />
          </Route>        

        </Switch>
      </Router>
    </div>
  );
}

//console.log('before useEffect', currentUser)

// useEffect(() => {
//     axios.get('http://localhost:8001/api/cookies', {withCredentials:true}).then((res) => 
//     { 
      
//       return setCurrentUser(res.data)        
//     })
//   },[islogin])
  
//console.log('after useEffect', currentUser)

// <Route exact path='/my-events/:screen' > 
// < MyEventsIndex currentUser = {currentUser}/>
// </Route > 
// <Route exact path='/owners/events/new' >
// <CreateEvent currentUser={currentUser}/>
// </Route>

// <Route exact path='/events/:eventId' render={(props) => <EventId eventId={props.match.params.eventId} user={currentUser}/>} /> 

// <Route exact path='/owners/events/:eventId/edit' render= {(props) => <EditEvent 
// eventId={props.match.params.eventId}
// currentUser = {currentUser}
// />} 
// />