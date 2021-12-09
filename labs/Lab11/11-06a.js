const rpc = require("rpc-websockets").Client;
const eventSocket = new rpc("ws://localhost:4000");

eventSocket.on("open", () => {
  eventSocket.subscribe("A").then(() => console.log("Subscribed to A event!"));
  eventSocket.on("A", () => console.log("Event A!"));
});
