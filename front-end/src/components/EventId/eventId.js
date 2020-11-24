import { React, useState, useEffect } from 'react'; 
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './eventId.scss';

export default function EventId (props) { 
  const {eventId} = useParams() 
  let [state, setState] = useState({})
  let [team1, setTeam1] = useState({goalies: [], strikers: [], midfielders: [], defenders: [] })
  let [team2, setTeam2] = useState({goalies: [], strikers: [], midfielders: [], defenders: [] }) 
  let [comments, setComments] = useState([{}])


  useEffect(() => {
    //URLS to query
    const event = `http://localhost:8001/api/events/${eventId}`
    const team = `http://localhost:8001/api/events/${eventId}/teams`
    const comment = `http://localhost:8001/api/events/${eventId}/comments`
    console.log(eventId)
    //Request to plug in to axios.all
    const eventRequest = axios.get(event)
    const teamRequest = axios.get(team, {eventId}) 
    const commentRequest = axios.get(comment, {eventId})
    console.log('before axios')
    //Making all 3 requests
    axios.all([eventRequest, teamRequest, commentRequest])
    .then(axios.spread((...responses) => {
      console.log('Check')
       //Request data
       const eventData = responses[0] 
       const teamData = responses[1] 
       const commentData = responses[2]  
       console.log(responses)
      
      //Destructuring data from request
      const {id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants, 
      province, referee, skill_level, title} = eventData.data[0] 
      
      //Adding data to the setstate
      setState({...state, id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants, 
        province, referee, skill_level, title})  
      
      //Sorting players by team
      const goalies1 = []
      const goalies2 = [] 
      const midfielders1 = []
      const midfielders2 = []
      const strikers1 = []
      const strikers2 = [] 
      const defenders1 = []
      const defenders2 = []

      for (const player of teamData.data){
        if (player.team_number === 1) {
          if (player.position === 'Goalie'){
            goalies1.push(`${player.first_name} ${player.last_name}`)
          } 
          else if (player.position === 'Striker') {
            strikers1.push(`${player.first_name} ${player.last_name}`)
          } 
          else if (player.position === 'Defender') {
            defenders1.push(`${player.first_name} ${player.last_name}`)
          } 
          else if (player.position === 'Midfielder') {
            midfielders1.push(`${player.first_name} ${player.last_name}`)
          } 
        } else {
          if (player.position === 'Goalie'){
            goalies2.push(`${player.first_name} ${player.last_name}`)
          } 
          else if (player.position === 'Striker') {
            strikers2.push(`${player.first_name} ${player.last_name}`)
          } 
          else if (player.position === 'Defender') {
            defenders2.push(`${player.first_name} ${player.last_name}`)
          } 
          else if (player.position === 'Midfielder') {
            midfielders2.push(`${player.first_name} ${player.last_name}`)
          } 

        }
      } 
      setTeam1({...team1, goalies: goalies1, strikers: strikers1, defenders: defenders1, midfielders: midfielders1 })
      setTeam2({...team2, goalies: goalies2, strikers: strikers2, defenders: defenders2, midfielders: midfielders2 }) 
      
      //Formatting Comments
      console.log(commentData)
      const commentFormatted = commentData.data.map((comment, index) => ({
          ...comment, 
          fullName: `${comment.first_name} ${comment.last_name}`
      })) 
      console.log(commentFormatted)
      setComments(commentFormatted) 
     })) 
  }, [])
  
  return( 
    <section>
      <h1>Hello</h1>
      <h1> {state.title} </h1> 
      <h1> {team1.goalies}</h1>
      <h1> {comments[0].fullName} </h1> 
      <h1> {comments[0].comment} </h1>
    </section>
  )
}