const fs = require("fs");
const url = require("url");

const errorHandler = require("./errorHandler");
const readFile = require("./readFile");
const pathToFile = "./file/StudentList.json";

module.exports = (request, response) => {
  let path = url.parse(request.url).pathname;
  if (/\/backup\/\d{8}/.test(path)) {
    let flag = false;
    fs.readdir("./backup", (err, files) => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].match(/\d{8}/)[0] < Number(path.match(/\d+/))) {
          flag = true;
          fs.unlink(`./backup/${files[i]}`, (e) => {
            if (e) {
              console.log("Error");
              errorHandler(request, response, e.code, e.message);
            } else {
              console.log("Ok");
              response.end("Ok");
            }
          });
        }
      }
      if (!flag) {
        errorHandler(request, response, 3, "Нет файлов");
      }
    });
  } else if (/\/\d+/.test(path)) {
    let fileJSON = JSON.parse(readFile());
    let id = Number(path.match(/\d+/)[0]);
    for (let i = 0; i < fileJSON.length; i++) {
      if (fileJSON[i].id === id) {
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(fileJSON[i]));
        delete fileJSON[i];
        fileJSON = fileJSON.filter(function (x) {
          return x !== null;
        });
        console.log("Студент удален");
      }
    }
    if (!response.hasHeader("Content-Type")) {
      errorHandler(request, response, 1, `Студент с id ${id} не существует`);
    } else {
      fs.writeFile(pathToFile, JSON.stringify(fileJSON), (e) => {
        if (e) {
          console.log("Error");
          errorHandler(request, response, e.code, e.message);
        } else {
          response.end();
        }
      });
    }
  } else {
    response.writeHead(404, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(`error 404`);
  }
};
