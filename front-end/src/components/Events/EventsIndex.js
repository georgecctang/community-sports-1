import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap/';
import './Events.scss'
export default function EventsIndex (props) {
  const [isLogout, setisLogout] = useState(false)
  function logout_validation() {
    axios.post('http://localhost:8001/api/logout', {}).then((res) => setisLogout(true))
  };
  if (isLogout) {
    return <Redirect to="/"/>
  };

  return (
    <>
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Sports</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
   
      <NavDropdown title="Events" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Upcoming Events</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Past Events</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">My Events</NavDropdown.Item>
      </NavDropdown>
    <Nav.Link href="/profile">My Profile</Nav.Link>
    <Button onClick={(event) => {event.preventDefault();
                          logout_validation()}}>Logout</Button>
    
    </Nav> 
    </Navbar.Collapse>
      
  </Navbar>

    <div className="events">
    <p>
    User information
    </p>
   </div>   
  </>
  )
}