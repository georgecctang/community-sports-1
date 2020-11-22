import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap/';

import React from 'react'
import './Main.scss'
export default function Main (props) {
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Sports</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
      <NavDropdown title="Events" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Upcoming Events</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Past Events</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">My Events</NavDropdown.Item>
      </NavDropdown>
    </Nav> 
  </Navbar.Collapse>
</Navbar>
    <div className="homepage">
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>   
  </React.Fragment> 
  )}