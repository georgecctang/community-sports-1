
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import EventForm from './EventForm'

export default function EditEvent (props) {
  const [newEvent, setnewEvent] = useState({})
  // const [edited, setnewEdited] = useState(false)
   useEffect(() => {
     axios.get(`http://localhost:8001/api/events/${props.eventId}`).then((res) => {
      setnewEvent(res.data[0])
      // console.log('getrequest',res.data[0])
    })
  },[])
  function editEvent() {
    console.log('id',props.eventId)
    console.log('newevent',newEvent)
  axios.put(`http://localhost:8001/api/owners/events/${props.eventId}/edit`,{...newEvent, owner_id: props.currentUser.id}).then((res) => {
    
    console.log('sent data',res.data)
    })
  }

  // const history = useHistory();

  // const cancel = () => { 
  //   history.push('/events');
  // }

  // if(edited === true) {
  //   return <Redirect to="/events"/>
  // }
  return (
   <EventForm newEvent={newEvent}
              setnewEvent={setnewEvent}
              newEventfunction={editEvent}
              // cancel={cancel}
             
              />
  );
  
}

