import { useState } from 'react';
import '../Events/Events.scss'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

// Props to change filter state
export default function EventFilter ({setCategoryFilter, setIsUpcoming, setIsAllEvents, setCity}) {
  
  const handleEventChange = (value) => {
    setIsAllEvents(value);
  } 


  const handleCategoryChange = (category, value) => {
    console.log(category)
    setCategoryFilter(prev => ({...prev, [category]: value}));
  } 


  return (
    <Form>
      <div onChange={(e) => handleCategoryChange('gender_restriction', e.target.value)} >
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
      <div onChange={(e) => handleCategoryChange('skill_level', e.target.value)} >
      <Form.Group controlId="level-form">
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
     
      <div onChange={(e) => handleCategoryChange('city', e.target.value)} >
      <Form.Group controlId="driving-time">
        <Form.Label>City</Form.Label>
          <Form.Control as="select" size="sm" className="select-button">
            <option type="radio" value="Toronto" name="driving_time" label="Toronto" defaultChecked>1</option>
            <option type="radio" value="Ottawa" name="" label="Ottawa">2</option>
            <option type="radio" value="Niagara Falls" name="" label="Niagara Falls">3</option>
          </Form.Control>
        </Form.Group>
      </div>

    </Form>)
};