import { useState } from 'react';
import '../Events/Events.scss'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

// Props to change filter state
export default function EventFilter ({setFilter}) {
  
  // The states should be in EventIndex and pass to EventFilter component
  // const [allEvents, setallEvents] = useState(data);
 
  const handleChange = (category, value) => {
    setFilter(prev => ({...prev, [category]: value}));
  } 


  return (
    <Form>
      <div onChange={(e) => handleChange('gender_restriction', e.target.value)} >
      <Form.Group controlId="gender-form">
        <Form.Label>Gender Restriction</Form.Label>
          <Form.Control as="select" size="sm" className="select-button">
            <option value="" name="gender_restriction" label="(Show All)" defaultChecked>1</option>
            <option type="radio" value="Male Only" name="gender_restriction" label="Male Only">2</option>
            <option type="radio" value="Female Only" name="gender_restriction" label="Female Only">3</option>
            <option type="radio" value="Other Only" name="gender_restriction" label="Other Only">4</option>
            <option type="radio" value="None" name="gender_restriction" label="None">5</option>
          </Form.Control>
        </Form.Group>
      </div> 
      <div onChange={(e) => handleChange('skill_level', e.target.value)} >
      <Form.Group controlId="gender-form">
        <Form.Label>Level</Form.Label>
          <Form.Control as="select" size="sm" className="select-button">
            <option type="radio" value="" name="skill_level" label="(Show All)" defaultChecked>1</option>
            <option type="radio" value="Beginner" name="skill_level" label="Beginner">2</option>
            <option type="radio" value="Intermediate" name="skill_level" label="Intermediate">3</option>
            <option type="radio" value="Advanced" name="skill_level" label="Advanced">4</option>
            <option type="radio" value="Open" name="skill_level" label="Open">5</option>
          </Form.Control>
        </Form.Group>
      </div>
     
    </Form>)
};

// // Fake data for testing
// const data = [
//   {id: 1, gender_restriction: 'Male Only', skill_level:"Intermediate", date: '2020-11-25'},
//   {id: 2, gender_restriction: 'Female Only', skill_level:"Beginner", date: '2020-11-25'},
//   {id: 3, gender_restriction: 'Other Only', skill_level:"Open", date: '2020-12-03'},
//   {id: 4, gender_restriction: 'Female Only', skill_level:"Open", date: '2020-11-25'},
//   {id: 5, gender_restriction: 'None', skill_level:"Open", date: '2020-11-25'},
//   {id: 6, gender_restriction: 'Male Only', skill_level:"Beginner", date: '2020-11-25'},
//   {id: 7, gender_restriction: 'None', skill_level:"Intermediate", date: '2020-12-03'},
//   {id: 8, gender_restriction: 'Female Only', skill_level:"Advanced", date: '2020-11-25'},
//   {id: 9, gender_restriction: 'Other Only', skill_level:"Intermediate", date: '2020-11-25'},
//   {id: 10, gender_restriction: 'Male Only', skill_level:"Beginner", date: '2020-12-03'},
//   {id: 11, gender_restriction: 'None', skill_level:"Advanced", date: '2020-11-25'},
//   {id: 12, gender_restriction: 'Female Only', skill_level:"Beginner", date: '2020-12-03'},
//   {id: 13, gender_restriction: 'None', skill_level:"Intermediate", date: '2020-11-25'},
//   {id: 14, gender_restriction: 'Male Only', skill_level:"Beginner", date: '2020-12-03'},
//   {id: 15, gender_restriction: 'Male Only', skill_level:"Intermediate", date: '2020-11-25'},
// ];

 {/* <div onChange={(e) => handleChange('gender_restriction', e.target.value)} >
        <Form.Label>Gender Restriction</Form.Label>
        <Form.Check type="radio" value="" name="gender_restriction" label="(Show All)" defaultChecked />
        <Form.Check type="radio" value="Male Only" name="gender_restriction" label="Male Only" /> 
        <Form.Check type="radio" value="Female Only" name="gender_restriction" label="Female Only" /> 
        <Form.Check type="radio" value="Other Only" name="gender_restriction" label="Other Only" /> 
        <Form.Check type="radio" value="None" name="gender_restriction" label="None" /> 
      </div> */}
       {/* // <div onChange={(e) => handleChange('skill_level', e.target.value)} >
      //   <Form.Label>Level</Form.Label>
      //   <Form.Check type="radio" value="" name="skill_level" label="(Show All)" defaultChecked />
      //   <Form.Check type="radio" value="Beginner" name="skill_level" label="Beginner" />
      //   <Form.Check type="radio" value="Intermediate" name="skill_level" label="Intermediate" />
      //   <Form.Check type="radio" value="Advanced" name="skill_level" label="Advanced" />
      //   <Form.Check type="radio" value="Open" name="skill_level" label="Open" />
      // </div> */}