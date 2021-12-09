const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:5000/broadcast");

let parm = process.argv[2];//аргументы командной строки
let prfx = typeof parm == "undefined" ? "A" : parm;

console.log("parm2 = ", parm);

ws.on("open", () => {
  let k = 0
  setInterval(() => {
    ws.send(`client: ${prfx} -> ${++k}`);
  }, 1000);

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });

  setTimeout(() => {
    ws.close();
  }, 25000);
});
