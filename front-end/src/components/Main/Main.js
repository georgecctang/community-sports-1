// import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap/';
// import axios from 'axios';
// import { useState } from 'react'
import './Main.scss'
import { Carousel, Card } from 'react-bootstrap';
import CarouselComponent from '../CarouselComponent/CarouselComponent'



export default function Main (props) {
 
  return (
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
  <CarouselComponent />

  <div className="card-row">
  <Card style={{ width: '36rem' }}>
  <div style={{backgroundColor: "red", width: "auto", height: "300px"}}></div>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
<Card style={{ width: '36rem' }}>
<div style={{backgroundColor: "red", width: "auto", height: "300px"}}></div>
<Card.Body>
  <Card.Title>Card Title</Card.Title>
  <Card.Text>
    Some quick example text to build on the card title and make up the bulk of
    the card's content.
  </Card.Text>
</Card.Body>
</Card>
</div>


  </div>
  )
}