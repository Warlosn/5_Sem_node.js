const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4000, host: "localhost" });

wss.on("connection", (ws) => {
  console.log("clients: ", wss.clients.size);
  let c = 0;
  wss.on("message", (data) => {
    console.log("on message: ", data.toString());
  });
  setInterval(() => {
    console.log("send message");
    ws.send(`11-03-server: ${++c}`);
  }, 15000);
  setInterval(() => {
    console.log("send ping: server ping");
    ws.ping("server ping");
  }, 5000);
  ws.on("pong", (data) => {
    console.log("receive pong: ", data.toString());
  });
});

wss.on("error", (e) => {
  console.log("error ", e);
});
