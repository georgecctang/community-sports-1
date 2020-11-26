import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EventFilter from './EventFilter';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/';
import Card from 'react-bootstrap/Card'
import './Events.scss'


export default function EventsIndex (props) {
  const [isLogout, setisLogout] = useState(false)

  console.log('props.currentUser', props.currentUser);
  // const [state, setState] = useState({users : [], events: []})
  // const [filter, setFilter] = useState({}); 

  const [allUpcomingEvents, setAllUpcomingEvents] = useState([{}]);
  const [allPastEvents, setAllPastEvents] = useState([{}]);
  const [myUpcomingEvents, setMyUpcomingEvents] = useState([{}]);
  const [myPastEvents, setMyPastEvents] = useState([{}]);
  const [isAllEvents, setIsAllEvents] = useState("All Events"); 
  const [isUpcoming, setIsUpcoming] = useState("Upcoming"); 
  const [categoryFilter, setCategoryFilter] = useState({}); 

  useEffect(() => {
    const first = axios.get('http://localhost:8001/api/events')
    const second = axios.get('http://localhost:8001/api/events/past')
    const third = axios.get(`http://localhost:8001/api/events/users/${props.currentUser.id}`)
    const fourth = axios.get(`http://localhost:8001/api/events/users/${props.currentUser.id}/past`)
    Promise.all([
      first,
      second,
      third,
      fourth
    ]).then(all => {
       setAllUpcomingEvents(prev => all[0].data);
       setAllPastEvents(prev => all[1].data);
       console.log(all[2].data)
       setMyUpcomingEvents(prev => all[2].data);
       setMyPastEvents(prev => all[3].data);
    })
  },[])


  function logout_validation() {
    axios.post('http://localhost:8001/api/logout', {}).then((res) => setisLogout(true))
  };


 // console.log('in event', props.currentUser)
  if (isLogout) {
    return <Redirect to="/"/>
  };
  

  // Function to filter event based on category
  const filterEvents = (eventsList, filter) => {
    let filteredEvents = eventsList;
    for (let category in filter) {
      filteredEvents = filter[category] ? filteredEvents.filter(event => event[category] === filter[category]) : filteredEvents;
    }
    return filteredEvents;
  }

  // Create an object that 
  const makeEventsByDateObj = (events) => {
    let dates = [...new Set(events.map(event => event.date).sort())];
    const eventsByDate = {};
    for (let date of dates) {
        eventsByDate[date] = events.filter(item => item.date === date)
    }
    return eventsByDate;
  }


  let subsetEvents;
  
  if (isAllEvents === "All Events") {
    subsetEvents = isUpcoming === "Upcoming" ? allUpcomingEvents : allPastEvents;
  } else {
    subsetEvents = isUpcoming === "Upcoming"  ? myUpcomingEvents : myPastEvents;
  }

  let filteredEvents = filterEvents(subsetEvents, categoryFilter);
  let eventsByDate = makeEventsByDateObj(filteredEvents);
  // 
  const eventElements = Object.keys(eventsByDate).map((date) => {
    return (
      <div key={date}>
      <h3>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
      {
        eventsByDate[date].map(event => {
          return (
            <div className="events">
            <Card >
              <Card.Link href={`/events/${event.id}`}>
              <div id="card-top">
            <Card.Header > {event.start_time && event.start_time.slice(0,5)} - {event.end_time && event.end_time.slice(0,5)}</Card.Header>
              <Card.Header>{event.first_name} {event.last_name}</Card.Header>
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
        <NavDropdown title="All Events" id="basic-nav-dropdown">
          <NavDropdown.Item href="/my-events/upcoming">Upcoming</NavDropdown.Item>
          <NavDropdown.Item href="/my-events/past">Past</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="My Events" id="basic-nav-dropdown">
          <NavDropdown.Item href="/my-events/upcoming">Joined</NavDropdown.Item>
          <NavDropdown.Item href="/my-events/past">Owned</NavDropdown.Item>
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
      <EventFilter setCategoryFilter={setCategoryFilter} setIsUpcoming={setIsUpcoming} setIsAllEvents={setIsAllEvents}  />
  </Nav>
    {eventElements.length ? eventElements : <p>There's no event with your criteria.</p>}
  </>
  )
}


// useEffect(() => {
//   const first = axios.get('http://localhost:8001/api/events')
//   const second = axios.get('http://localhost:8001/api/checkdb/users')
//   Promise.all([
//     first,
//     second
//   ]).then(all => {
//      return setState(prev => ({...prev, events : all[0].data, users: all[1].data}))
//   })
// },[])