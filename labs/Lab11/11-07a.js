const rpcWSC = require("rpc-websockets").Client;

let ws = new rpcWSC("ws://localhost:4000/");

console.log("Enter notify A, B or C");

process.stdin.setEncoding("utf-8");
process.stdin.on("readable", () => {
  let chunk = null;
  while ((chunk = process.stdin.read(1)) != null) {
    ws.notify(chunk);
  }
});
