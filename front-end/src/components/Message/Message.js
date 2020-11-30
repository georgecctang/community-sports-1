import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Messages(props)  {
  
  const [messages, setMessages] = useState([{}]);

;

  useEffect(() => {
    axios.get(`http://localhost:8001/api/messages/${props.currentUser.id}`)
    .then((res) => {
      setMessages(res.data);
    })
  },[])

  return (
    <div>
      {messages.map(message => <p>{message.body}</p>)}
    </div>    
    )


} 