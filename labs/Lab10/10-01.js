const http = require("http");
const WebSocket = require("ws");

http
  .createServer((req, res) => {
    if (req.url === "/start" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
      res.end(require("fs").readFileSync("./10-01.html"));
    } else {
      res.writeHead(400, { "Content-Type": "text/html; charset = utf-8" });
      res.statusCode = 400;
      res.end("<h1>400<h1>");
    }
  })
  .listen(3000);

let k = 0;

const wsserver = new WebSocket.Server({
  port: 4000,
  host: "localhost",
  path: "/wsserver",
});

wsserver.on("connection", (ws) => {
  let lastMessage;
  ws.on("message", (message) => {
    console.log(`${message}`);
    lastMessage = message.slice(-1);
  });
  setInterval(() => {
    ws.send(`10-01-server: ${lastMessage} ->  ${++k}`);
  }, 5000);
  setTimeout(() => {
    wsserver.close();
    ws.on("close", () => {
      console.log("wssocket close");
    });
  }, 25000);
});

wsserver.on("error", (e) => {
  console.log("wsserver error", e);
});

console.log(
  `wsserver: host:${wsserver.options.host}, port:${wsserver.options.port}, path:${wsserver.options.path}`
);
