const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4000, host: "localhost" });

wss.on("connection", (ws) => {
  let dataFromClient;
  ws.on("message", (data) => {
    dataFromClient = JSON.parse(data);
    console.log("on message: ", data);
  });

  let count_of_messages = 0;
  setInterval(() => {
    ws.send(
      JSON.stringify({
        id: count_of_messages++,
        client: dataFromClient.client,
        data: new Date().toISOString(),
      })
    );
  }, 5000);
});

wss.on("error", (e) => {
  console.log("wss server error", e);
});
