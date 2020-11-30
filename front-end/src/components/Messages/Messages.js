import {useState, useEffect} from 'react';
import io from 'socket.io-client';


export default function Messages(props) {

  const [socket, setSocket] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
  
    if (!props.currentUser) {
      return;
    }
  const newSocket = io('http://localhost:5000', {query: {id: props.currentUser.id}});
  console.log('run new socket effect in Messages');
  setSocket(prev => newSocket);
  return () => newSocket.close();
  },[])


  useEffect(() => {
    if (socket === null) return;
    console.log('receive message socket on')
    socket.on('receive-message', (data) => {
      console.log('data', data);
      // setMessages([...messages, text])
    } );
  }, [socket])

  function handleSubmit(e) {
    e.preventDefault();
    console.log('socket', socket);
    socket.emit('send-message', {sender_id: props.currentUser.id, recipient_id: 2, text});
    console.log('submit', text);
    setText(prev => '');
  }

  return (
    <>
    <h1>Message Page</h1>
    <form onSubmit={e => handleSubmit(e)}>
    <input type='textarea' value={text} onChange={e => setText(e.target.value)} />
    <button type="submit">submit</button>
    </form>
    {messages.map(item => <h3>{item}</h3>)}
    </>
    );
}
