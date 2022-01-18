const rpcWSC = require("rpc-websockets").Client;
const client = new rpcWSC("ws://localhost:4000");

client.on("open", () => {
  client
    .subscribe("change")
    .then(() => console.log("Подписались на изменение"));
  client.on("change", () => console.log("Файл был изменён!"));
});
