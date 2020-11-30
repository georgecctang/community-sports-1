const io = require('socket.io')(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }

});

io.on('connection', socket => {
  const id = socket.handshake;
  console.log('socket.handshake.session.id', id);  

  socket.on('send-message', ({sender_id, recipient_id, text}) => {
    
    console.log('text', text);
    console.log('socketId[recipent_id]', socketId[recipient_id]);
    console.log('socketId[sender_id]', socketId[sender_id]);
    socket.broadcast.to(socketId[recipient_id]).emit('receive-message', {text})
  } )


})

console.log('listening to port 5000')