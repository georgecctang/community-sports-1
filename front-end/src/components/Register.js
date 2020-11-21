import {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import './Register.scss'

export default function Register (props) {
  const [ user, setUser ] = useState ({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: ""
  })
  
  return (
    <div className="Register">
      <Form onSubmit={event => {
                            event.preventDefault();
                            props.onSubmit(user);
        }}>
        <Form.Group size="lg" controlId="formGroupEmail">
        <Form.Control
          type="first_name"
          placeholder="First Name"
          value={user.first_name}
          onChange={(event) => setUser({...user, first_name: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupEmail">
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
        <Form.Group size="lg" >
        <Form.Control
          type="password"
          value={user.password}
          placeholder="password"
          onChange={(event) => setUser({...user, password: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg">
        <Form.Control
          value={user.phone}
          placeholder="Phone"
          onChange={(event) => setUser({...user, phone: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" >
        <Form.Control
          value={user.age}
          placeholder="Age"
          onChange={(event) => setUser({...user, age: event.target.value })}
        />
        </Form.Group>
        <Form.Group size="lg" >
          <Form.Control
            as="select" defaultValue="Choose..."
            value={user.gender}
            placeholder="Gender"
            onChange={(event) => setUser({...user, gender: event.target.value })}
          > <option> Choose...</option>
            <option> male</option>
            <option> female</option>
            <option> other</option>
          </Form.Control>
        </Form.Group>
        <Button block size="lg" type="submit" value="Submit"> Register </Button>
     </Form>
    </div>
  );
}