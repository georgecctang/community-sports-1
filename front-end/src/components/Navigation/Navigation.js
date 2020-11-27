import { Modal, Button} from 'react-bootstrap'
import { useState } from 'react';
import './Navigation.scss'
import field from './field.jpeg'
import axios from 'axios';

export default function Navigation (props) {
  const [show, setShow] = useState(false)
  const eventId = { event_id: props.eventId }
  console.log(eventId)
  //Blue is Team 1 Red is Team 2
  function counter () { //--> maybe we need current user name ?
    //Get player ID to assign to position
     axios.get('http://localhost:8001/api/cookies', {withCredentials:true})
      .then(res => {
        const player_id = res.data.id
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
          <Button id="position-goalie" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Goalie');
                                                                        }}> goalie </Button>
          <Button id="position-defender_1" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Defender')}}> defender 1 </Button>
          <Button id="position-defender_2" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Defender')}}> defender 2 </Button>
          <Button id="position-defender_3" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Defender')}}> defender 3 </Button>
          <Button id="position-defender_4" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Defender')}}> defender 4 </Button>
          <Button id="position-midfield_1" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Midfielder')}}> midfield 1 </Button>
          <Button id="position-midfield_2" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Midfielder')}}> midfield 2 </Button>
          <Button id="position-midfield_3" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Midfielder')}}> midfield 3 </Button>
          <Button id="position-midfield_4" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Midfielder')}}> midfield 4 </Button>
          <Button id="position-striker_1" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Striker')}}> striker 1 </Button>
          <Button id="position-striker_2" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter('Striker')}}> striker 2 </Button>
          <img src={field} alt="field" className="img-fluid" />
        </Modal.Body>
    </Modal>
    </>
  )
}