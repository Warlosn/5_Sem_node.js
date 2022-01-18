const fs = require('fs');
const url = require('url');

const errHandler = require('./errorHandler');
const readFile = require('./readFile');
const pathToFile = './file/StudentList.json';

module.exports = (request, response) => {
    let path = url.parse(request.url).pathname;
    if(path === '/') {
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            let fileJSON = JSON.parse(readFile());
            let flag = true;
            fileJSON.forEach(item => {
                if(item.id === JSON.parse(body).id) {
                    flag = false;
                }
            });
            if(!flag){
            for(let i = 0; i < fileJSON.length; i++) {
                if (fileJSON[i].id === JSON.parse(body).id) {
                    fileJSON[i] = JSON.parse(body);
                    fs.writeFile(pathToFile, JSON.stringify(fileJSON), (e) => {
                        if (e) {
                            console.log('ERROR');
                            errHandler(request, response, e.code, e.message);
                        }
                        else {
                            flag = true;
                            console.log('Cтудент был изменен');
                            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                            response.end(JSON.stringify(JSON.parse(body)));
                        }
                    });

                }
            }
            }
            else {
                errHandler(request, response, 1, `Студент с id ${JSON.parse(body).id} не существует`);
            }
        });
    }
    else{
        response.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(`error 404`);
    }
};