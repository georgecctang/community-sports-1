// import { useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap/';
// import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// export default function Navigation (props) {
//   const [isLogout, setisLogout] = useState(false)
//   function logout_validation() {
//     axios.post('http://localhost:8001/api/logout', {}).then((res) =>
//     { 
//       console.log(res.data)
//       setisLogout(true);
//     })
//   };
//   if (isLogout) {
//   return <Redirect to="/"/>
//   };

// return (
//   <Navbar bg="light" expand="lg">
//     <Navbar.Brand href="/">Sports</Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="mr-auto">
//     {!props.islogin && 
//       <>
//       <Nav.Link href="/login">Login</Nav.Link>
//       <Nav.Link href="/register">Register</Nav.Link></>
//       }
//       {props.islogin && 
//       <>
//       <NavDropdown title="Events" id="basic-nav-dropdown">
//         <NavDropdown.Item href="#action/3.1">Upcoming Events</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.2">Past Events</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.3">My Events</NavDropdown.Item>
//       </NavDropdown>
//     <Nav.Link href="/profile">My Profile</Nav.Link>
//     <Button onClick={(event) => {event.preventDefault();
//                           props.logout_validation()}}>Logout</Button>
//     </>
//     }
//     </Nav> 
//     </Navbar.Collapse>
      
//   </Navbar>)
// }


// {/* <nav>
// <div>
//   <Link to='/'>Sports</Link>
// </div>
//   <ul className="menu">
//   <li><Link to='/profile'>My Profile</Link></li>
//   <li><Button onClick={() => logout_validation()}>Logout</Button></li>
  
// </ul>
// </nav> */}