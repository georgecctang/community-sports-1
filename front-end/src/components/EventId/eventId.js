import axios from 'axios';
import {useParams} from 'react-router-dom';
import { React, useState } from 'react'; 
import './eventId.scss';

export default function EventsIndex (props) { 
  const {eventId} = useParams() 
  let eventInfo 

  axios.get(`http://localhost:8001/api/event/${eventId}`, {}).then((res) => {
    eventInfo = res.data
  })
  
  return( 
    {eventInfo}
  )
}