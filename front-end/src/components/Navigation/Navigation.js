import { Modal, Button} from 'react-bootstrap'
import { useState } from 'react';
import './Navigation.scss'
import field from './field.jpeg'

export default function Navigation (props) {
  const [show, setShow] = useState(false)
  const player = {
    current_player : 8,
    max_player : 10
  }
  const[goalie, setGoalie] = useState(false)
  //after clicked the button, button can be disable? this function is not working?
  function counter (player) { //--> maybe we need current user name ?
   if (player.current_player < player.max_player) {
     console.log('setGoalie',goalie)
     if (goalie === true){ //---> update the state as false after that :()
       console.log('goalie is clicked')
     } else { console.log('nope')}
    player.current_player += 1; 
    console.log('in if',player.current_player)
   } else {
     console.log('else', player.current_player)
     console.log("There is no place for a new player")
   }
   console.log('player',player)
    return player
  }
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
      Custom Width Modal
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-lg"
        aria-labelledby="title">
        <Modal.Header closeButton>
          <Modal.Title id="title">Choose your position</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button id="position-goalie" size="sm" onClick={(event) => { event.preventDefault();
                                                                        setGoalie(true)
                                                                        counter(player);
                                                                        }}> goalie </Button>
          <Button id="position-defender_1" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> defender 1 </Button>
          <Button id="position-defender_2" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> defender 2 </Button>
          <Button id="position-defender_3" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> defender 3 </Button>
          <Button id="position-defender_4" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> defender 4 </Button>
          <Button id="position-midfield_1" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> midfield 1 </Button>
          <Button id="position-midfield_2" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> midfield 2 </Button>
          <Button id="position-midfield_3" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> midfield 3 </Button>
          <Button id="position-midfield_4" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> midfield 4 </Button>
          <Button id="position-striker_1" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> striker 1 </Button>
          <Button id="position-striker_2" size="sm" onClick={(event) => { event.preventDefault();
                                                                        counter(player)}}> striker 2 </Button>
          <img src={field} alt="field" className="img-fluid" />
        </Modal.Body>
    </Modal>
    </>
  )
}