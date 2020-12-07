import { Nav, Navbar } from 'react-bootstrap';
import logo from './logo.png'

export default function NavBar(props) {

  return (

    <Navbar bg="light" expand="lg" fixed="top">
    <Navbar.Brand href="/"><img src={logo} alt="logo"/> </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="justify-content-end">
    <Nav.Link href="/login">Login</Nav.Link>
    <Nav.Link href="/register">Register</Nav.Link>
    </Nav> 
    </Navbar.Collapse>
    </Navbar>
    
  )
};

