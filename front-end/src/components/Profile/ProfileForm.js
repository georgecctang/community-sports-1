import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown , Card} from 'react-bootstrap/';
import './Profile.scss'
export default function ProfileForm (props) {
  const [isLogout, setisLogout] = useState(false)
  function logout_validation() {
    axios.post('http://localhost:8001/api/logout', {}).then((res) => setisLogout(true))
  };
  console.log('profile', props.islogin)
  console.log(props.currentUser)
  if (isLogout) {
    return <Redirect to="/"/>
  };
  console.log(props)
  return (
    <>
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/events">Sports</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Events" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Upcoming Events</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Past Events</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">My Events</NavDropdown.Item>
      </NavDropdown>
    <Nav.Link href="/profile">My Profile</Nav.Link>
    <Button onClick={() => {logout_validation()}}>Logout</Button>
    
    </Nav> 
    </Navbar.Collapse>
      
  </Navbar>

    <div className="profile">
    <Card border="info" >
    <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png" />
    {props.currentUser &&
    <Card.Body>
      <Card.Title>{props.currentUser.first_name} {props.currentUser.last_name} </Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
}
  </Card>
    </div>   
 </>
  )
}