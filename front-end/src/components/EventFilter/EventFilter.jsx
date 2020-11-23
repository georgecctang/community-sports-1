import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

// Fake data for testing
const data = [
  {id: 1, gender: 'Male', level:"Intermediate", date: '2020-11-25'},
  {id: 2, gender: 'Female', level:"Beginner", date: '2020-11-25'},
  {id: 3, gender: 'Other', level:"Open", date: '2020-12-03'},
  {id: 4, gender: 'Female', level:"Open", date: '2020-11-25'},
  {id: 5, gender: 'Co-ed', level:"Open", date: '2020-11-25'},
  {id: 6, gender: 'Male', level:"Beginner", date: '2020-11-25'},
  {id: 7, gender: 'Co-ed', level:"Intermediate", date: '2020-12-03'},
  {id: 8, gender: 'Female', level:"Advanced", date: '2020-11-25'},
  {id: 9, gender: 'Other', level:"Intermediate", date: '2020-11-25'},
  {id: 10, gender: 'Male', level:"Beginner", date: '2020-12-03'},
  {id: 11, gender: 'Co-ed', level:"Advanced", date: '2020-11-25'},
  {id: 12, gender: 'Female', level:"Beginner", date: '2020-12-03'},
  {id: 13, gender: 'All', level:"Intermediate", date: '2020-11-25'},
  {id: 14, gender: 'Male', level:"Beginner", date: '2020-12-03'},
  {id: 15, gender: 'Male', level:"Intermediate", date: '2020-11-25'},
];

// Props to change filter state
export default function EventFilter (props) {
  
  // The states should be in EventIndex and pass to EventFilter component
  const [allEvents, setallEvents] = useState(data);
  const [filter, setFilter] = useState({}); 

  // The functions below  should be in be EventIndex Component

  const filterEvents = () => {
    let filteredEvents = allEvents;
    for (let category in filter) {
      filteredEvents = filter[category] ? filteredEvents.filter(event => event[category] === filter[category]) : filteredEvents;
    }
    return filteredEvents;
  }

  const makeEventsByDateObj = (events) => {
    let dates = [...new Set(events.map(event => event.date).sort())];
    const eventsByDate = {};
    for (let date of dates) {
        eventsByDate[date] = events.filter(item => item.date === date)
    }
    return eventsByDate;
  }

  const handleChange = (category, value) => {
    setFilter(prev => ({...prev, [category]: value}));
    // filteredEvents = filterEvents();
    // eventsByDate = makeEventsByDateObj(filteredEvents);
  } 

  let filteredEvents = filterEvents();
  let eventsByDate = makeEventsByDateObj(filteredEvents);
    
  console.log(filteredEvents);

  const eventElements = Object.keys(eventsByDate).map((date) => {
    return (
      <div key={date}>
      <h3>{date}</h3>
      {
        eventsByDate[date].map(event => {
          return (
            <div key={event.id}>
            <p>{event.gender} | {event.level}</p>
            <p></p>
            </div>
          )
        })
      }
      </div>
    )
  });


  return (

    <div className='App'>
    <div className='App-header'>
    
    <Form>
      <div onChange={(e) => handleChange('gender', e.target.value)} >
        <Form.Label>Gender</Form.Label>
        <Form.Check type="radio" value="" name="gender" label="(Show All)" defaultChecked />
        <Form.Check type="radio" value="Male" name="gender" label="Male" /> 
        <Form.Check type="radio" value="Female" name="gender" label="Female" /> 
        <Form.Check type="radio" value="Other" name="gender" label="Other" /> 
        <Form.Check type="radio" value="Co-ed" name="gender" label="Co-ed" /> 
      </div>
      <div onChange={(e) => handleChange('level', e.target.value)} >
        <Form.Label>Level</Form.Label>
        <Form.Check type="radio" value="" name="level" label="(Show All)" defaultChecked />
        <Form.Check type="radio" value="Beginner" name="level" label="Beginner" />
        <Form.Check type="radio" value="Intermediate" name="level" label="Intermediate" />
        <Form.Check type="radio" value="Advanced" name="level" label="Advanced" />
        <Form.Check type="radio" value="Open" name="level" label="Open" />
      </div>
    </Form>
      <div>
        {eventElements.length ? eventElements : <p>Currently no event available with this criteria.</p> }
      </div>
      </div>
    </div>);
};
