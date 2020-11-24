import './App.scss';
import axios from 'axios';
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
import { useState , useEffect} from 'react';

export default function App(props) {
  const [islogin, setisLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  useEffect(() => {
    setTimeout(() => {
      axios.get('http://localhost:8001/api/cookies', {withCredentials:true}).then((res) => 
      {
        return setCurrentUser(prev => ({...prev ,currentUser : res.data}))
        
      })
    }, 2000)
    },[islogin])
  

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
            <ProfileForm currentUser = {currentUser}
            /> 
          </Route>
          <Route exact path='/events' > 
           <EventsIndex  
            currentUser = {currentUser}/> 
          </Route>
          <Route exact path='/events/:eventsId' > 
          <EventId />
          </Route > 
        </Switch>
      </Router>
    </div>
    
  );
}

