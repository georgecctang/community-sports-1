// import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap/';
// import axios from 'axios';
// import { useState } from 'react'
import './Main.scss'
export default function Main (props) {
 

  return (
    <>
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Sports</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    
    </Nav> 
    </Navbar.Collapse>
      
  </Navbar>
    <img src="https://www.lowerislandsoccer.com/wp-content/uploads/2019/10/soccer-ball-ss-img.jpg" alt='homepage_image'></img>
    <div className="homepage">
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. .</p>
  </div>   
  </>
  )
}