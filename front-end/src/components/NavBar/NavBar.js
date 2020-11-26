import { Redirect, useRouteMatch ,Link} from 'react-router-dom';
import axios from 'axios';
import { React, useState, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';

export default function NavBar(props) {

  const handleEventChange = (value) => {
    props.setIsAllEvents(value);
  } 

  const handleTimeChange = (value) => {
    props.setIsUpcoming(value);
  } 

  return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/events">Sports</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Form inline>
            <div onChange={(e) => handleEventChange(e.target.value)} >
            <Form.Group controlId="event-form">
                <Form.Control as="select" size="sm" className="select-button">
                  <option type="radio" value="All Events" name="events" label="All Events" defaultChecked></option>
                  <option type="radio" value="My Events" name="events" label="My Events"></option>
                </Form.Control>
              </Form.Group>
            </div> 
        
            <div onChange={(e) => handleTimeChange(e.target.value)} >
            <Form.Group controlId="time-form">
                <Form.Control as="select" size="sm" className="select-button">
                  <option type="radio" value="Upcoming" name="time" label="Upcoming" defaultChecked>1</option>
                  <option type="radio" value="Past" name="time" label="Past">2</option>
                </Form.Control>
              </Form.Group>
              </div> 
          </Form>        
          <Nav.Link href="/profile">My Profile<span>{props.currentUser.first_name} {props.currentUser.last_name}</span></Nav.Link>
          <Button size="sm" onClick={(event) => {event.preventDefault();
                          props.logout_validation()}}>Logout</Button>
        </Nav> 


      </Navbar.Collapse>
      </Navbar>
)

}
