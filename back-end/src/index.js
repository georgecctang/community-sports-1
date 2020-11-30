const PORT = process.env.PORT || 8001;
const ENV = require("./environment");

const app = require("./application")(ENV);
const server = require("http").Server(app);

const WebSocket = require("ws");
// const wss = new WebSocket.Server({ server });

const io = require('socket.io')(server);

io.on('connection', socket => {
  const id = socket.handshake.query.id;
  socket.join(id)
  // console.log(`user ${id} connected`);

  socket.on('message', (data) => {
    console.log('data ', data);
    // console.log('text: ', text);
  })

})



// wss.on("connection", socket => {
//   socket.onmessage = event => {
//     console.log(`Message Received: ${event.data}`);

//     if (event.data === "ping") {
//       socket.send(JSON.stringify("pong"));
//     }
//   };
// });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
