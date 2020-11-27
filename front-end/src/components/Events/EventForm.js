
import axios from 'axios';
import {useState} from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';


export default function EventForm ({newEvent, setnewEvent, newEventfunction, cancel}) {
  console.log("here",newEvent)
 
  // if(created === true) {
  //   return <Redirect to="/events"/>
  // }
 
  return (
    <div className="newEvent">
      <Form onSubmit={event => {
                            event.preventDefault();
                            newEventfunction()
        }}>
        <Form.Group size="lg" controlId="dob">
        <Form.Control
          type="date"
          name="dob"
          value={newEvent.date}
          onChange={(event) => setnewEvent({...newEvent, date: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="appt">
        <Form.Control
          type="time"
          name="appt"
          placeholder="Start Time"
          value={newEvent.start_time}
          onChange={(event) => setnewEvent({...newEvent, start_time: event.target.value })}
        />
        </Form.Group>
  
        <Form.Group size="lg" controlId="appt">
        <Form.Control
          type="time"
          placeholder="End Time"
          value={newEvent.end_time}
          onChange={(event) => setnewEvent({...newEvent, end_time: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupTitle">
        <Form.Control
          type="text"
          value={newEvent.title}
          placeholder="Give a Title"
          onChange={(event) => setnewEvent({...newEvent, title: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupAddress">
        <Form.Control
          value={newEvent.address}
          placeholder="Address"
          onChange={(event) => setnewEvent({...newEvent, address: event.target.value })}
        />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupCity" >
        <Form.Control
          value={newEvent.city}
          placeholder="City"
          onChange={(event) => setnewEvent({...newEvent, city: event.target.value })}
        />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupProvince" >
        <Form.Control
          value={newEvent.province}
          placeholder="Province"
          onChange={(event) => setnewEvent({...newEvent, province: event.target.value })}
        />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupCurrentParticipants" >
        <Form.Control
          value={newEvent.current_participants}
          placeholder="Current Participants"
          onChange={(event) => setnewEvent({...newEvent, current_participants: event.target.value })}
        />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupMaximumParticipants" >
        <Form.Control
          value={newEvent.max_participants}
          placeholder="Maximum Participants"
          onChange={(event) => setnewEvent({...newEvent, max_participants: event.target.value })}
        />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupSkillLevel">
           <Form.Control
            as="select" defaultValue="Choose..."
            value={newEvent.skill_level}
            placeholder="Level"
            onChange={(event) => setnewEvent({...newEvent, skill_level: event.target.value })}
          > <option> Level... </option>
            <option> Beginner </option>
            <option> Intermediate </option>
            <option> Advanced </option>
            <option> Open </option>
          </Form.Control>
        </Form.Group>
       
        <Form.Group size="lg" controlId="formGroupGenderRestriction">
           <Form.Control
            as="select" defaultValue="Choose..."
            value={newEvent.gender_restriction}
            placeholder="Gender"
            onChange={(event) => setnewEvent({...newEvent, gender_restriction: event.target.value })}
          > <option> Gender...</option>
            <option> Male</option>
            <option> Female</option>
            <option> Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupReferee">
           <Form.Control
            as="select" defaultValue="Choose..."
            value={newEvent.referee}
            placeholder="Referee?"
            onChange={(event) => setnewEvent({...newEvent, referee: event.target.value })}
          > <option> Referee...</option>
            <option> TRUE </option>
            <option> FALSE</option>
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupInfo" >
        <Form.Control
          value={newEvent.additional_info}
          placeholder="Additional Info"
          onChange={(event) => setnewEvent({...newEvent, additional_info: event.target.value })}
        />
        </Form.Group>

        <Button block size="lg" type="submit" onClick={() => console.log("hello")} > Save </Button> 
        <Button block size="lg" onClick={cancel} > Cancel </Button>
     </Form>
    
    </div>
     
  );
  
}