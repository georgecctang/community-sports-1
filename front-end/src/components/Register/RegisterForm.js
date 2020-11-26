import axios from 'axios';
import {useState} from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import './Register.scss'

export default function Register (props) {
  const [isSignup, setisSignup] = useState(false)
  const [error, setError ] = useState("")
  const [ user, setUser ] = useState ({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: ""
  })
  function registration () {
    axios.post('http://localhost:8001/api/register', user).then((res) => {
      if(res.data === "Email already in use") {
        setError(res.data)
      } else {
        setisSignup(true)
      }
    })
  }
  if (isSignup === true) {
    return <Redirect to="/profile"/>
  }
  return (
    <div className="Register">
      <Form onSubmit={event => {
                            event.preventDefault();
                            registration()
        }}>
        <Form.Group size="lg" controlId="formGroupFirstName">
        <Form.Control
          type="first_name"
          placeholder="First Name"
          value={user.first_name}
          onChange={(event) => setUser({...user, first_name: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupLastName">
        <Form.Control
          type="last_name"
          placeholder="Last Name"
          value={user.last_name}
          onChange={(event) => setUser({...user, last_name: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupEmail">
        <Form.Control
          type="email"
          placeholder="email"
          value={user.email}
          onChange={(event) => setUser({...user, email: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupPassword">
        <Form.Control
          type="password"
          value={user.password}
          placeholder="password"
          onChange={(event) => setUser({...user, password: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupPhone">
        <Form.Control
          value={user.phone}
          placeholder="Phone"
          onChange={(event) => setUser({...user, phone: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupAge" >
        <Form.Control
          value={user.age}
          placeholder="Age"
          onChange={(event) => setUser({...user, age: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupGender">
          <Form.Control
            as="select" defaultValue="Choose..."
            value={user.gender}
            placeholder="Gender"
            onChange={(event) => setUser({...user, gender: event.target.value })}
          > <option> Gender...</option>
            <option> Male</option>
            <option> Female</option>
            <option> Other</option>
          </Form.Control>
        </Form.Group>
        <Button block size="lg" type="submit"> Register </Button>
     </Form>
    <h2>{error}</h2>
    </div>
  );
}