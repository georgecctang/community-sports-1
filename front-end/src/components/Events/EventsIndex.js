import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import EventFilter from './EventFilter';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/';
import Card from 'react-bootstrap/Card'
import './Events.scss'
import { getOwnerNames } from "../../helpers/filterFunctions";


export default function EventsIndex (props) {
  const [isLogout, setisLogout] = useState(false)
  function logout_validation() {
    axios.post('http://localhost:8001/api/logout', {}).then((res) => setisLogout(true))
  };
  
  const [filter, setFilter] = useState({}); 
 
  if (isLogout) {
    return <Redirect to="/"/>
  };
  

  const filterEvents = () => {
    let filteredEvents = props.events;
    for (let category in filter) {
      filteredEvents = filter[category] ? filteredEvents.filter(event => event[category] === filter[category]) : filteredEvents;
    }
    return filteredEvents;
  }

  const makeEventsByDateObj = (events) => {
    let dates = [...new Set(events.map(event => event.date).sort())];
    const eventsByDate = {};
    for (let date of dates) {
        eventsByDate[date] = events.filter(item => item.date === date)
    }
    return eventsByDate;
  }
  console.log("current user", props.currentUser)
  let filteredEvents = filterEvents();
  let eventsByDate = makeEventsByDateObj(filteredEvents);
  // 
  const eventElements = Object.keys(eventsByDate).map((date) => {
    return (
      <div key={date}>
      <h3>{date}</h3>
      {
        eventsByDate[date].map(event => {
          return (
            <div className="events">
            <Card >
              <Card.Link href={`/events/${event.id}`}>
              <div id="card-top">
              <Card.Header > {event.start_time} - {event.end_time}</Card.Header>
              <Card.Header>{getOwnerNames(props.users,event.owner_id)}</Card.Header>
              </div>
              <Card.Body >
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <small className="text-muted">{event.province}</small>
                </Card.Text>
                <div id="card-bottom">
                  <Card.Text>
                    {event.skill_level}
                  </Card.Text>
                  <Card.Text>
                  {event.current_participants}/{event.max_participants}
                  </Card.Text>
                </div>
              </Card.Body>
              </Card.Link>
            </Card>
            
            </div>
          )
        }) 
      }
      </div>
    ) 
  });  
  return (
    <>
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/events">Sports</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
          <NavDropdown title="Events" id="basic-nav-dropdown">
          <NavDropdown.Item href="/events/past">Upcoming Events</NavDropdown.Item>
            <NavDropdown.Item href="/events/past">Past Events</NavDropdown.Item>
            <NavDropdown.Item href="/user/:id">My Events</NavDropdown.Item>
          </NavDropdown>
       
      </Nav> 
      {props.currentUser &&
      <Nav className="justify-content-end">
          {/* <Nav.Link href="/profile">My Profile */}
          <span>{props.currentUser.first_name} {props.currentUser.last_name}</span>
          {/* </Nav.Link> */}
          <Button size="sm" onClick={(event) => {event.preventDefault();
                          logout_validation()}}>Logout</Button>
      </Nav>   }
    </Navbar.Collapse>
  </Navbar>
  <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky"></div>
      <EventFilter setFilter={setFilter} />
  </Nav>
    {eventElements.length ? eventElements : <p>There's no event with your criteria.</p>}
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

  // {state.events && state.events.map(event => {
  //   return (<div className="events">
  //     <Card >
  //       <div id="card-top">
  //       <Card.Header > {event.start_time} - {event.end_time}</Card.Header>
  //       <Card.Header>{getOwnerNames(state,event.owner_id)}</Card.Header>
  //       </div>
  //       <Card.Body >
  //       <Card.Title>{event.title}</Card.Title>
  //     <Card.Text>
  //       <small className="text-muted">{event.province}</small>
  //     </Card.Text>
  //     <div id="card-bottom">
  //     <Card.Text>
  //       {event.skill_level}
  //     </Card.Text>
  //     <Card.Text>
  //       {event.current_participants}/{event.max_participants}
  //     </Card.Text>
  //     </div>
  //     </Card.Body>
  //     </Card>
  //  </div>   
  //  ) })}