// import axios from 'axios';
// import {  useState, useEffect } from 'react';
// import { getOwnerNames } from "../../helpers/filterFunctions";
// // import { Navbar, Nav, NavDropdown } from 'react-bootstrap/';
// import Card from 'react-bootstrap/Card'
// import './Events.scss'

// export default function EventsPast (props) {
//     const [past, setPastEvent] = useState({})
    
//     useEffect(() => {
//       axios.get('http://localhost:8001/api/events/past').then((res) => {
//         console.log('data', res.data)
//         return setPastEvent(prev => ({...prev, pastEvent : res.data}))
//       })
//     }, []);
//     console.log('past',past)
//     if(Object.keys(past).length === 0) {
//       return null;
//     }
//     return (
//       past.pastEvent && past.pastEvent.map( event => {
//         return (
//         <div className="events">
//         <Card >
//           <Card.Link href={`/events/${event.id}`}>
//           <div id="card-top">
//           <Card.Header > {event.start_time} - {event.end_time}</Card.Header>
//           <Card.Header>{getOwnerNames(props.users,event.owner_id)}</Card.Header>
//           </div>
//           <Card.Body >
//             <Card.Title>{event.title}</Card.Title>
//             <Card.Text>
//               <small className="text-muted">{event.province}</small>
//             </Card.Text>
//             <div id="card-bottom">
//               <Card.Text>
//                 {event.skill_level}
//               </Card.Text>
//               <Card.Text>
//               {event.current_participants}/{event.max_participants}
//               </Card.Text>
//             </div>
//           </Card.Body>
//           </Card.Link>
//         </Card>
//          </div>
//         )
//       })
       
//     )
    
// }

   