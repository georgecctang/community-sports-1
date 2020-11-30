import {useState, useEffect} from 'react';
import axios from 'axios';
import { ListGroup, Form, Button } from 'react-bootstrap';
import './Message.scss';

export default function Messages(props)  {
  
  const [messages, setMessages] = useState([]);
  const [messageObj, setMessageObj] = useState({});
  const [contactList, setContactList] = useState([]);
  const [currentContact, setCurrentContact] = useState({});
  // const [conversation, setConversation] = useState([{}]);
  const [newMessageText, setNewMessageText] = useState('');

  // console.log('props.currentUser', props.currentUser);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/messages/${props.currentUser.id}`)
    .then((res) => {    
      setMessages(() => res.data);
    })
  },[])

  useEffect(() => {
    const obj = createMessageObj(props.currentUser.id, messages);
    setMessageObj(() => obj);
    const list = createContactList(props.currentUser.id, messages);
    setContactList(() => list);
  }, [messages])

  function createMessageObj (user_id, messages) {
    const result = {};
    messages.forEach((message,index) => {
      if (message.sender_id !== user_id) {
        if (result[message.sender_id]) {
          result[message.sender_id].push(message);
        } else {
          result[message.sender_id] = [message];
        }
      } else {
        if (result[message.recipient_id]) {
          result[message.recipient_id].push(message);
        } else {
          result[message.recipient_id] = [message];
        }
      }
    })
    return result;
  }

  function createContactList(user_id, messages) {
    console.log('run createContactList');
    const contactList = [];
    messages.reverse().forEach(message => {
      const newContact = {};
      if (message.sender_id !== user_id) {
        newContact.id = message.sender_id;
        newContact.first_name = message.sender_first_name;
        newContact.last_name = message.sender_last_name;
      } else {
        newContact.id = message.recipient_id;
        newContact.first_name = message.recipient_first_name;
        newContact.last_name = message.recipient_last_name;
      }
      if (!contactList.find(contact => contact.id === newContact.id)) {
        contactList.push(newContact)
      }
    })
    return contactList;
  }

  function handleClick (obj) {
    setCurrentContact(() => obj);
  }

  function handleChange (e) {
    setNewMessageText(e.target.value)
  }

  function handleSubmit(e) {


    const reqBody = {
      senderId: props.currentUser.id, 
      recipientId: currentContact.id, 
      body: newMessageText
    }
    // console.log(reqBody);
    e.preventDefault();
    axios.post("http://localhost:8001/api/messages", reqBody)
    .then(res => {
      console.log("return data",res);
      const messageId = res.data.message_id;
      const sentMessage = {
        id: messageId, 
        sender_id: props.currentUser.id,
        sender_first_name: props.currentUser.first_name,
        sender_last_name: props.currentUser.last_name,
        recipient_id: currentContact.id,
        recipient_first_name: currentContact.first_name,
        recipient_last_name: currentContact.last_name,
      body:  newMessageText};
      console.log('messages before append', messages);
      const newMessageList = [...messages.reverse(), sentMessage]; 
      console.log('newMessageList', newMessageList);
      setMessages(() => newMessageList);
    })
    setNewMessageText('');
  }

  function compareObjectsById(a,b) {
    return a.id > b.id ? 1 : -1;
  }

  const conversation = messageObj[currentContact.id] || [];
  console.log('props.currentUser', props.currentUser);
  console.log('messages', messages);
  console.log('messageObj', messageObj);

  return (
    <div className="message-page">
      
      <div className="message-left">
          <ListGroup>
          {contactList.map(({id, first_name, last_name}) => {
            return (
              <ListGroup.Item
                active={currentContact.id === id}
                key={id}
                onClick={() =>handleClick({id, first_name, last_name})}
                >
                {first_name} {last_name}
              </ListGroup.Item>
            )})
          }
          </ListGroup>
      </div>
      <div className="message-right flex-column">
      
        <div className="conversation">
            {conversation.sort(compareObjectsById).map((message, index) => {
              return (
                <div key={index}>{message.body}</div>
              )
              })
            }
        </div>
        <div>
          <Form onSubmit={handleSubmit} className="new-message-form">
          <Form.Control 
          as="textarea" 
          required value={newMessageText} 
          onChange={handleChange}
          style={{height:'20vh', margin: '2vh 0vh', resize:'none'}}
          >
          </Form.Control>
          <Button type="submit" variant="primary" block>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
    )
    
} 