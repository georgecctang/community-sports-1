import { useHistory } from 'react-router-dom';
import  { useState, React } from "react";
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import './Login.scss';

export default function Login (props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const loginUser =  function() {
    axios.post('http://localhost:8001/api/login', { email, password },{withCredentials:true}).then((res) =>
    
    { 
      if(res.data === "Incorrect login information") {
        setError(res.data);
        return;
        
      } else {
        window.localStorage.setItem('userData', JSON.stringify(res.data));
        console.log('logined');
        history.push("/events");
       }
      }
    )
  }

  return (
    <>
    {/* <div className="Login"> */}
    <NavBar />
    <div className="Login">
    <Form 
    id="login-form"
    onSubmit={event => {
                  event.preventDefault();
                  loginUser()
                }}>
      <Form.Group as={Row} size="lg" controlId="formBasicEmail">
        <Form.Label column sm="2">Email</Form.Label>
        <Col sm="10">
        <Form.Control
        required
        type="email"  
        placeholder="Enter your email"
        value={email} 
        onChange={(event) => {setEmail(event.target.value)}}
        />
        </Col>
    </Form.Group> 
      <Form.Group as={Row} size="lg" controlId="password">
      <Form.Label column sm="2">Password</Form.Label>
      <Col sm="10">
      <Form.Control
      required
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      />
      </Col>
      </Form.Group>
      
      <Button id="btn_login" block size="lg" type="submit">
        Login
      </Button>
    </Form>
    <h4 className="error-message">{error}</h4>
    </div>
    </>
  );
 
}; 


