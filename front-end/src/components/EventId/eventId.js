import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from '../MapContainer/MapContainer'
import { GetPosition } from '../../hooks/usePosition'
import './eventId.scss';
import soccerIcon from './soccerIcon.png'
import Navigation from '../Navigation/Navigation'
import CommentBox from './CommentBox'
require('dotenv').config()




export default function EventId(props) {
  const [position, setPosition] = useState([])
  const [team1, setTeam1] = useState({ goalies: [], strikers: [], midfielders: [], defenders: [] })
  const [event, setEvent] = useState({
    id: 0, owner_id: 0, date: '', start_time: '', end_time: '', additional_info: '', address: '', city: '', current_participants: 0, gender_restriction: '', location: '', max_participants: 0,
    province: '', referee: false, skill_level: '', title: ''
  })
  const [team2, setTeam2] = useState({ goalies: [], strikers: [], midfielders: [], defenders: [] })
  const [comments, setComments] = useState([{}])
  const [distance, setDistance] = useState({})
  const [comment, setComment] = useState()
  const [userJoined, setUserJoined] = useState(false)
  const eventId = props.eventId 

  const distanceApi = (coords, location) => {
    //Distance Matrix API
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${coords[0]},${coords[1]}&destinations=${location.x}%2C${location.y}&key=${process.env.REACT_APP_geocodeKey}`
    const myInit = {
      method: 'GET',
      mode: 'no-cors',
    }
    fetch(proxyurl + URL)
      .then(response => response.text())
      .then(data => {
        return data ? JSON.parse(data) : {}
      })
      .then(data => {
        setDistance({ ...distance, distance: data.rows[0].elements[0].distance.text, time: data.rows[0].elements[0].duration.text })
      })
  }

  const eventData = () => {
    //URLS to query
    const eventInfo = `http://localhost:8001/api/events/${props.eventId}`
    const team = `http://localhost:8001/api/events/${props.eventId}/teams`
    const comment = `http://localhost:8001/api/events/${props.eventId}/comments`
    //Request to plug in to axios.all
    const eventRequest = axios.get(eventInfo)
    const teamRequest = axios.get(team)
    const commentRequest = axios.get(comment)
    //Making all 3 requests
    Promise.all([eventRequest, teamRequest, commentRequest])
      .then((responses) => {
        //Request data
        const eventData = responses[0]
        const teamData = responses[1]
        const commentData = responses[2]

        //Destructuring data from request
        const { id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants,
          province, referee, skill_level, title, first_name, last_name } = eventData.data[0]
        //Adding data to the setstate
        setEvent(prev => ({
          ...prev, id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants,
          province, referee, skill_level, title, first_name, last_name
        }))

        //Sorting players by team
        const goalies1 = []
        const goalies2 = []
        const midfielders1 = []
        const midfielders2 = []
        const strikers1 = []
        const strikers2 = []
        const defenders1 = []
        const defenders2 = []
        for (const player of teamData.data) {
          if (player.team_number === 1) {
            if (player.position === 'Goalie') {
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
            if (player.position === 'Goalie') {
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
        setTeam1(prev => ({ ...prev, goalies: goalies1, strikers: strikers1, defenders: defenders1, midfielders: midfielders1 }))
        setTeam2(prev => ({ ...prev, goalies: goalies2, strikers: strikers2, defenders: defenders2, midfielders: midfielders2 }))

        //Formatting Comments
        const commentFormatted = commentData.data.map((comment, index) => ({
          ...comment,
          fullName: `${comment.first_name} ${comment.last_name}`
        }))
        setComments(commentFormatted)

        //Request users position
        navigator.geolocation.getCurrentPosition(async success => {
          const pos = [
            success.coords.latitude,
            success.coords.longitude
          ];
          if (location) {
            //Set user position
            setPosition(pos)
            if (pos) {
              //Get distance from user to event
              distanceApi(pos, location)
            }
          }
        })
        return eventData.data[0]
      })
  }


  useEffect(() => {
    eventData()
    console.log(comments)
  }, [setComments])

  return (
    <section>
      <h1> {event.title} </h1>
      <h3> Hosted By: {event.first_name} {event.last_name}</h3>
      <div className='midpage'>
        <div className='additional-info'>
          <p> {event.additional_info} </p>
        </div>
        <div className='map'>
          <p> This location is {distance.distance} away</p>
          <p> It will take you {distance.time} to get there</p>
          {event.location && (<MapContainer location={event.location} title={event.title} />)}
        </div>
      </div>
      <aside className='right-column'>
        <h4> Event Details </h4>
        <h5> {event.current_participants}/{event.max_participants} <img src={soccerIcon} /></h5>
        <h5> {event.start_time}-{event.end_time}</h5>
        <h5> {event.address}, {event.city}</h5>
        {/* <h5> From Your Location: {distance.distance} | {distance.time}</h5> */}
        <h5> Gender Restriction: {event.gender_restriction}</h5>
        <h5> Skill Level: {event.skill_level}</h5>
        <Navigation eventId={eventId} team1={team1} team2={team2} team='Blue' user={props.user} setUserJoined={setUserJoined} teamState={team1} setTeam={setTeam1} />
        {!userJoined && <Navigation eventId={eventId} team1={team1} team2={team2} team='Red' user={props.user} setUserJoined={setUserJoined} teamState={team2} setTeam={setTeam2}/>}
      </aside>
      <div className='game-container'>
        <div className='team1-container'>
          <div className='position-container'>
            <h1> Goalies</h1>
            {team1.goalies.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <h1> Defenders</h1>
            {team1.defenders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <h1> Midfielders</h1>
            {team1.midfielders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <h1> Strikers</h1>
            {team1.strikers.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
        </div>

        <div className='team2-container'>
          <div className='position-container'>
            <h1> Goalies</h1>
            {team2.goalies.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <h1> Defenders</h1>
            {team2.defenders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <h1> Midfielders</h1>
            {team2.midfielders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <h1> Strikers</h1>
            {team2.strikers.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
        </div>
      </div>
      <div className='comments-container'>
        <CommentBox user={props.user} eventId={eventId} setComments={setComments} comments={comments}/>
        {comments.map(comment => (
          <div className='comment'>
            <h1> {comment.fullName} </h1>
            <h5> {comment.comment} </h5>
          </div>
        ))}
      </div>
    </section>
  )
}