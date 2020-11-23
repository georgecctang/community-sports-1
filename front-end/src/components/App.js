import './App.scss';
import axios from 'axios';
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
import Main from './Main';
import { useState , useEffect} from 'react';
import  useAppData  from "../hooks/useAppData";


export default function App(props) {
  const [islogin, setisLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8001/api/login').then((res) => {
      console.log(res)
      setisLogin(true) 
       //? we need the current user name
  })
  },[])

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
            <ProfileForm 
            /> 
          </Route>
          <Route path='/events' > 
           <EventsIndex  /> {/* in eventsIndex, props.state is {events:{}, users:{}}*/}
          </Route>
         
        </Switch>
      </Router>
    </div>
    
  );
}

