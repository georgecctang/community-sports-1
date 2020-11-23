import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { React, useState, useEffect, } from 'react';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap/';
import Card from 'react-bootstrap/Card'
import './Events.scss'

export default function EventsIndex (props) {
  const [isLogout, setisLogout] = useState(false)
  function logout_validation() {
    axios.post('http://localhost:8001/api/logout', {}).then((res) => setisLogout(true))
  };
  
  const [state, setState] = useState({})

  useEffect(() => {
    const first = axios.get('http://localhost:8001/api/events')
    const second = axios.get('http://localhost:8001/api/checkdb/users')
    Promise.all([
      first,
      second
    ]).then(all => {
       return setState(prev => ({...prev, events : all[0].data, users: all[1].data}))
    })
  },[])
 
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

  <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
  <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
  </Nav>
  {state.events && 
    <div className="events">
      <Card className="cards-container">
        <Card.Header> {state.events[0].start_time} - {state.events[0].end_time}</Card.Header>
        <Card.Body className="card_body">
        <Card.Title>{state.events[0].title}</Card.Title>
        <Card.Text className="text_body">
        
      </Card.Text>
      <Card.Text>
        <small className="text-muted">{state.events[0].province}</small>
      </Card.Text>
      </Card.Body>
      </Card>
      {/* <span>{state.events[1].date}</span> */}
     <Card className="cards-container">
     
      <Card.Header> {state.events[0].start_time} - {state.events[0].end_time}</Card.Header>
        <Card.Body className="card_body">
        <Card.Title>{state.events[1].title}</Card.Title>
        <Card.Text>
        With supporting text below as a natural lead-in to additional content.
      </Card.Text>
      </Card.Body>
    </Card>
    
   </div>   
        }
  </>
  )
}

// 
// key={event.id} 
// {...event}
//     additional_info={event.additional_info} 
//     address={event.address}
//     city= {event.city}
//     current_participants= {event.current_participants}
//     date= {event.date}
//     end_time= {event.end_time}
//     gender_restriction= {event.gender_restriction}
//     id= {event.id}
//     max_participants= {event.max_participants}
//     owner_id= {event.owner_id}
//     province= {event.province}
//     referee= {event.referee}
//     skill_level= {event.skill_level}
//     start_time= {event.start_time}
//     title= {event.title} }
  // 