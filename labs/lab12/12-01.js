const http = require("http");
const fs = require("fs");
const rpcWSS = require("rpc-websockets").Server;

const pathToFile = "./file/StudentList.json";

const getHandler = require("./getHandler");
const postHandler = require("./postHandler");
const putHandler = require("./putHandler");
const deleteHandler = require("./deleteHandler");

http
  .createServer((request, response) => {
    switch (request.method) {
      case "GET":
        getHandler(request, response);
        break;
      case "POST":
        postHandler(request, response);
        break;
      case "PUT":
        putHandler(request, response);
        break;
      case "DELETE":
        deleteHandler(request, response);
        break;
    }
  })
  .listen(5000);

let server = new rpcWSS({
  port: 4000,
  host: "localhost",
  path: "/",
});

server.event("change");

fs.watch(pathToFile, (eventType, filename) => {
  server.emit("change");//генерация
});
