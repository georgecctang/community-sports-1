import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  } from "react-router-dom";
import Login from './Login/LoginForm'
import Register from './Register'
import Navigation from './Navigation';
import Main from './Main';

export default function App(props) {

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
        <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/login'>
            <Login />
              {/* <Redirect to='/'/> */}
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

