const rpc = require("rpc-websockets").Client;
const eventSocket = new rpc("ws://localhost:4000");

eventSocket.on("open", () => {
  eventSocket.subscribe("B").then(() => console.log("Subscribed to B event!"));
  eventSocket.on("B", () => console.log("Event B!"));
});
