const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:4000");

ws.on("message", (data) => {
  console.log("on message: ", data.toString());
});

ws.on("pong", (data) => {
  console.log("receive pong: ", data.toString());
});

setInterval(() => {
  console.log("send ping: client ping");
  ws.ping("client ping");
}, 5000);
