import './App.scss';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
  } from "react-router-dom";
import Login from './Login/LoginForm'
import EventId from './EventId/eventId'
import Register from './Register/RegisterForm'
import ProfileForm from './Profile/ProfileForm'
import EventsIndex from './Events/EventsIndex';
import CreateEvent from './Events/CreateEvent';
import Navigation from './Navigation/Navigation'
import MyEventsIndex from './MyEvents/MyEventsIndex';
import Main from './Main';

import { useState , useEffect} from 'react';

export default function App(props) {
  const [islogin, setisLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState("")

  // const [state, setState] = useState({users : [], events: []})
 

  // useEffect(() => {
  //   const first = axios.get('http://localhost:8001/api/events')
  //   const second = axios.get('http://localhost:8001/api/checkdb/users')
  //   Promise.all([
  //     first,
  //     second
  //   ]).then(all => {
  //      return setState(prev => ({...prev, events : all[0].data, users: all[1].data}))
  //   })
  // },[])
  console.log('isLogin before useEffect', islogin);

  useEffect(() => {
   
      axios.get('http://localhost:8001/api/cookies', {withCredentials:true}).then((res) => 
      { 
        // console.log('before',islogin)
      // console.log('aftertrue',islogin)
        return setCurrentUser(prev => ({...prev ,user : res.data}))
        
      })
    
    },[islogin])

  console.log('isLogin after useeffect',islogin)
console.log(currentUser.user)
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
            <ProfileForm  currentUser = {currentUser.user}
            /> 
          </Route>

          <Route path='/navigation'>
            <Navigation
            /> 
          </Route>

          <Route exact path='/events' > 
           <EventsIndex  
            currentUser = {currentUser.user}/> 
          </Route>

          <Route exact path='/owners/events/new' >
            <CreateEvent currentUser = {currentUser.user}/>
          </Route>
          <Route exact path='/events/:eventId' > 
            <EventId />
          </Route>
          <Route exact path='/my-events/:screen' > 
          < MyEventsIndex currentUser = {currentUser.user}/>
        </Route > 
        </Switch>
      </Router>
    </div>
    
  );
}

//id = {currentUser.user.id}
// first_name = {currentUser.user.first_name}
// last_name = {currentUser.user.last_name}