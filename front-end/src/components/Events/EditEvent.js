
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import EventForm from './EventForm'

export default function EditEvent (props) {
  const [newEvent, setnewEvent] = useState({})
  
   useEffect(() => {
     axios.get(`http://localhost:8001/api/events/${props.eventId}`).then((res) => {

      setnewEvent(res.data[0])
      console.log(res.data[0])
    })
  },[])
  const history = useHistory();

  const cancel = () => { 
    setnewEvent("");
    history.push('/events');
  }
  // if(created === true) {
  //   return <Redirect to="/events"/>
  // }
  return (
   <EventForm newEvent={newEvent}
              setnewEvent={setnewEvent}
              />
  );
  
}

