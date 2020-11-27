
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import EventForm from './EventForm'

export default function EditEvent (props) {
  const [newEvent, setnewEvent] = useState({})
  // const [event, setEvent ] = useState(false)
  // console.log(props)
   useEffect(() => {
     axios.get(`http://localhost:8001/api/events/${props.eventId}`).then((res) => {
       console.log(res)
      setnewEvent(res.data)
      console.log(res.data)
    })
  },[])

  function editEvent (edittedEvent) {
    axios.post(`http://localhost:8001/api/owners/events/${props.eventId}`, edittedEvent ).then((res) =>
    console.log(res) )
  }

  return (
   <EventForm newEvent={newEvent}
   setnewEvent={setnewEvent}/>
  );
  
}
//fix initial fetch
//use event form for create
//save 