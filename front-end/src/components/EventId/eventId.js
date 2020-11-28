import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from '../MapContainer/MapContainer'
import { GetPosition } from '../../hooks/usePosition'
import {  Nav,Navbar, NavDropdown, Button } from 'react-bootstrap/';
import './eventId.scss';
import soccerIconwhite from './soccerIconwhite.png'
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
  const eventId = { id: props.eventId }

  const distanceApi = (coords, location) => {
    //Distance Matrix API
    console.log("Line 99")
    console.log('My location', coords[0], coords[1])
    console.log('event location', event.location)
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
        console.log('data', data.rows[0].elements[0].distance)
        setDistance({ ...distance, distance: data.rows[0].elements[0].distance.text, time: data.rows[0].elements[0].duration.text })
      })
  }

  const eventData = () => {
    //URLS to query
    console.log(props.eventId)
    const eventInfo = `http://localhost:8001/api/events/${props.eventId}`
    const team = `http://localhost:8001/api/events/${props.eventId}/teams`
    const comment = `http://localhost:8001/api/events/${props.eventId}/comments`
    //Request to plug in to axios.all
    const eventRequest = axios.get(eventInfo)
    const teamRequest = axios.get(team, eventId)
    const commentRequest = axios.get(comment, eventId)
    //Making all 3 requests
    Promise.all([eventRequest, teamRequest, commentRequest])
      .then((responses) => {
        //Request data
        const eventData = responses[0]
        console.log('eventData', eventData)
        const teamData = responses[1]
        const commentData = responses[2]

        //Destructuring data from request
        const { id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants,
          province, referee, skill_level, title } = eventData.data[0]
        console.log('This is location of event', location)
        //Adding data to the setstate
        setEvent(prev => ({
          ...prev, id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants,
          province, referee, skill_level, title
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
        console.log('Line 53')
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
          // console.log('pos', pos)
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
  }, [])

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
              <Nav.Link href="/profile">My Profile<span>{props.currentUser.first_name} {props.currentUser.last_name}</span></Nav.Link>
              <Button size="sm" onClick={(event) => {
                event.preventDefault();
                // logout_validation()
              }}>Logout</Button>
            </Nav>}
        </Navbar.Collapse>
      </Navbar>
      
    <main id="main-page">
    <section>
      <h1> {event.title} </h1>
      <h3> Hosted By: </h3>
      <div className='midpage'>
        <div className='additional-info'>
          <p> {event.additional_info} </p>
        </div>
        <div className='map'>
          <p> This location is {distance.distance} away</p>
          <p> It will take you {distance.time} to get there</p>
          <div id="map_place">
          {event.location && (<MapContainer location={event.location} title={event.title} />)}
          </div>
        </div>
      </div>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">Hellloooo</div>
        <h4> Event Details </h4>
        <p> {event.current_participants}/{event.max_participants} <img src={soccerIconwhite} alt="icon"/></p>
        <p > {event.start_time}-{event.end_time}</p>
        <h5> {event.address}, {event.city}</h5>
        <h5> From Your Location: {distance.distance} | {distance.time}</h5>
        <h5> Gender Restriction: {event.gender_restriction}</h5>
        <h5> Skill Level: {event.skill_level}</h5>
        </Nav>
      <div className='game-container'>
        <div className='team1-container'>
          <div className='position-container'>
            <p> Goalies</p>
            {team1.goalies.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <p> Defenders</p>
            {team1.defenders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <p> Midfielders</p>
            {team1.midfielders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <p> Strikers</p>
            {team1.strikers.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
        </div>

        <div className='team2-container'>
          <div className='position-container'>
            <p> Goalies</p>
            {team2.goalies.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <p> Defenders</p>
            {team2.defenders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <p> Midfielders</p>
            {team2.midfielders.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
          <div className='position-container'>
            <p> Strikers</p>
            {team2.strikers.map(player => (
              <div className='player-info'> {player} </div>
            ))}
          </div>
        </div>
      </div>
    </section>
      <footer id="comments-container">
        {comments.map(comment => (
          <div className='comment'>
            <h4> {comment.fullName} </h4>
            <p> {comment.comment} </p>
          </div>
        ))}
      </footer>
      </main>
    </>
  )
}