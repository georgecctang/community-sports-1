import { React, useState, useEffect } from 'react'; 
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './eventId.scss';

export default function EventID (props) { 
  const {eventId} = useParams() 
  let [state, setState] = useState({})

  useEffect(() => {
    //URLS to query
    const event = `http://localhost:8001/api/events/${eventId}`
    const team = `http://localhost:8001/api/events/${eventId}/teams`
    //const comment = `http://localhost:8001/api/events/${eventId}/comments`

    //Request to plug in to axios.all
    const eventRequest = axios.get(event)
    const teamRequest = axios.get(team, {eventId}) 
    //const commentRequest = axios.get(comment, {eventId})

    //Making all 3 requests
    axios.all([eventRequest, teamRequest])
    .then(axios.spread((...responses) => {
      //Request data
      const eventData = responses[0] 
      const teamData = responses[1] 
      //const commentData = responses[2] 
      
      //Destructuring data from request
      const {id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants, 
      province, referee, skill_level, title} = responses[0].data[0] 
      console.log(responses[1].data)
      //Adding data to the setstate
      setState({...state, id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants, 
        province, referee, skill_level, title})  
    })) 
  }, [])

  return( 
    <section>
      <h1>Hello</h1>
      <h1> {state.title} </h1>
    </section>
  )
}