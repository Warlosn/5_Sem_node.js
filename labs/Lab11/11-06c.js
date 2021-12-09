const rpc = require("rpc-websockets").Client;
const eventSocket = new rpc("ws://localhost:4000");

eventSocket.on("open", () => {
  eventSocket.subscribe("C").then(() => console.log("Subscribed to C event!"));
  eventSocket.on("C", () => console.log("Event C!"));
});
