import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import './Navigation.scss'
import field from './field.jpeg'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ActionAlerts from './MuiAlert'

export default function Navigation(props) {
  const [show, setShow] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const eventId = props.eventId.id
  //Blue is Team 1 Red is Team 2
  let teamId
  if (props.team === 'Blue') {
    teamId = 1
  } else {
    teamId = 2
  }
  function counter(position) { //--> maybe we need current user name ?
    //Get player ID to assign to position
    axios.get('http://localhost:8001/api/cookies', { withCredentials: true })
      .then(res => {
        const player_id = res.data.id
        console.log('eventid', eventId, 'playerid', player_id, 'positon selected', position, 'teamID', teamId)
        axios.post(`http://localhost:8001/api/users/events/${eventId}/create`, { teamNumber: teamId, position: position, userId: player_id })
      })
  }



  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Join Team {props.team}
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-lg"
        aria-labelledby="title">
        <Modal.Header closeButton>
          <Modal.Title id="title">Choose your position on the {props.team.toLowerCase()} team!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id='alert' className={`${confirm ? 'alert-show' : 'alert-hide'}`} >
            <ActionAlerts  hide={setConfirm}/>
          </div>
          <Button id="position-goalie" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Goalie');
            setConfirm(true)
          }}> goalie </Button>
          <Button id="position-defender_1" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Defender')
            setConfirm(true)
          }}> defender 1 </Button>
          <Button id="position-defender_2" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Defender')
            setConfirm(true)
          }}> defender 2 </Button>
          <Button id="position-defender_3" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Defender')
            setConfirm(true)
          }}> defender 3 </Button>
          <Button id="position-defender_4" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Defender')
            setConfirm(true)
          }}> defender 4 </Button>
          <Button id="position-midfield_1" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Midfielder')
            setConfirm(true)
          }}> midfield 1 </Button>
          <Button id="position-midfield_2" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Midfielder')
            setConfirm(true)
          }}> midfield 2 </Button>
          <Button id="position-midfield_3" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Midfielder')
            setConfirm(true)
          }}> midfield 3 </Button>
          <Button id="position-midfield_4" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Midfielder')
            setConfirm(true)
          }}> midfield 4 </Button>
          <Button id="position-striker_1" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Striker')
            setConfirm(true)
          }}> striker 1 </Button>
          <Button id="position-striker_2" size="sm" onClick={(event) => {
            event.preventDefault();
            counter('Striker')
            setConfirm(true)
          }}> striker 2 </Button>
          <img src={field} alt="field" className="img-fluid" />
        </Modal.Body>
      </Modal>
    </>
  )
}