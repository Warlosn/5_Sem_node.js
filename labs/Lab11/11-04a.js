const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:4000");

let parm = process.argv[2];
let clientName = typeof parm == "undefined" ? "Kirill" : parm;

ws.on("open", () => {
  ws.on("message", (data) => {
    data = JSON.parse(data);
    console.log("on message: ", data);
  });

  setInterval(() => {
    ws.send(
      JSON.stringify({ client: clientName, data: new Date().toISOString() })
    );
  }, 3000);
});

ws.on("error", (e) => {
  console.log("wss server error", e);
});
