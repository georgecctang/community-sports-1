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
import Main from './Main';

export default function App(props) {
  
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/login'>
            <Login />
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
          <Route to='/logout' component={Main}>
            <Redirect to='/'/>
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

