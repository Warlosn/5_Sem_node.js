const rpcServer = require("rpc-websockets").Server;

const eventSocket = new rpcServer({ port: 4000, host: "localhost", path: "/" });

eventSocket.event("A");
eventSocket.event("B");
eventSocket.event("C");

console.log("Choose A, B, C event");

process.stdin.setEncoding("utf-8");
process.stdin.on("readable", () => {
  let chunk = null;
  while ((chunk = process.stdin.read(1)) != null) {
    eventSocket.emit(chunk);
  }
});
