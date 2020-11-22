import  { useState, useEffect, React } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './Login.scss'

export default function Login (props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError ] = useState("")
  const [islogin, setisLogin] = useState(false)

  const userLoggedin =  function() {
    if (email === "") {
      setError("this cannot be blank")
      return;
    }
    if (password === "") {
      setError("this cannot be blank")
      return;
    }
    axios.post('http://localhost:8001/api/login', { email, password }).then((res) =>
     { 
       if(res.data === "Email does not exist") {
         setError(res.data)
        
       } else {
        setisLogin(true);
       }
      }
    )
  }
  if (islogin) {
    return <Redirect to="/events"/>
  };

  return (
    <>
    <nav>
    <div>
      <Link to='/'>Sports</Link>
    </div>
    <ul className="menu">
      <li><Link to='/register'>Signup</Link></li>
    </ul>
    </nav>
    <div className="Login">
    <Form 
    id="login"
    onSubmit={event => {
                  event.preventDefault();
                  userLoggedin()

                }}>
      <Form.Group size="lg" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email"  
           value={email} 
          onChange={(event) => {
            setEmail(event.target.value)
          }}
       />
    </Form.Group> 
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button block size="lg" type="submit">
        Login
      </Button>
    </Form>
    <h2>{error}</h2>
    </div>
  </>
  );
}; 
