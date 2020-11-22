import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Events.scss'
export default function EventsIndex (props) {
  const [isLogout, setisLogout] = useState(false)
  function logout_validation() {
    axios.post('http://localhost:8001/api/logout', {}).then((res) =>
    { 
      console.log(res.data)
      setisLogout(true);
    })
  };

  if (isLogout) {
  return <Redirect to="/"/>
  };

  return (
    <>
    <nav>
    <div>
      <Link to='/'>Sports</Link>
    </div>
      <ul className="menu">
      <li><Link to='/profile'>My Profile</Link></li>
      <li><Button onClick={() => logout_validation()}>Logout</Button></li>
      
    </ul>
    </nav>
    <div className="events">
    <p>
    User information
    </p>
   </div>   
  </> 
  )}