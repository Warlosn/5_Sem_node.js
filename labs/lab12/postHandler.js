const fs = require("fs");
const url = require("url");

const errHandler = require("./errorHandler");
const readFile = require("./readFile");
const pathToFile = "./file/StudentList.json";

module.exports = (request, response) => {
  let path = url.parse(request.url).pathname;
  if (path === "/") {
    let body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      let flag = true;
      let fileJSON = JSON.parse(readFile());
      fileJSON.forEach((item) => {
        if (item.id === JSON.parse(body).id) {
          flag = false;
        }
      });
      if (flag) {
        fileJSON.push(JSON.parse(body));
        fs.writeFile(pathToFile, JSON.stringify(fileJSON), (e) => {
          if (e) {
            console.log("Error");
            errHandler(request, response, e.code, e.message);
          } else {
            console.log("Добавлен студент");
            response.writeHead(200, {
              "Content-Type": "application/json; charset=utf-8",
            });
            response.end(JSON.stringify(JSON.parse(body)));
          }
        });
      } else {
        errHandler(
          request,
          response,
          2,
          `Студент с id  ${JSON.parse(body).id} уже существует`
        );
      }
    });
  } else if (path === "/backup") {
    let date = new Date();
    fs.copyFile(
      pathToFile,
      `./backup/${date.getFullYear()}${
        date.getMonth() + 1
      }${date.getDate()}_StudentList.json`,
      (err) => {
        if (err) {
          console.log("Error");
          errHandler(request, response, err.code, err.message);
        } else {
          console.log("Копия была создана");
          response.end("Копия была создана");
        }
      }
    );
  } else {
    response.writeHead(404, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(`error 404`);
  }
};
