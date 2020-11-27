// import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap/';
// import axios from 'axios';
// import { useState } from 'react'
import './Main.scss'

export default function Main (props) {
 
  return (
    <>
    <div className="homepage" >
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Sports</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="justify-content-end">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav> 
    </Navbar.Collapse>
  </Navbar>
   
  </div>   
  </>
  )
}