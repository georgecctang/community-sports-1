import axios from 'axios';
import {useState} from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import EventForm from './EventForm'

export default function CreateEvent (props) {
  const [newEvent, setnewEvent] = useState({})
  const [created, setCreated ] = useState(false)
  function newEventfunction ()  {
    axios.post('http://localhost:8001/api/owners/events/new', {...newEvent, owner_id: props.currentUser.id} ).then((res) => {
      setCreated(true)
    })
  }
  
  const history = useHistory();

  const cancel = () => { 
    // setnewEvent("");
    history.push('/events');
  }
  if(created === true) {
    return <Redirect to="/events"/>
  }

  return (
    <EventForm newEvent={newEvent}
              setnewEvent={setnewEvent}
              newEventfunction={newEventfunction}
              cancel={cancel}
    />
   );
}