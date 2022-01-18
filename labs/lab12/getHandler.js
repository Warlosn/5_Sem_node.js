const url = require('url');
const fs = require('fs');

const errorHandler = require('./errorHandler');
const readFile = require('./readFile');

module.exports = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch(true) {
        case path === '/': {
            response.setHeader('Content-Type', 'application/json; charset=utf-8');
            response.end(readFile());
            break;
        }
        case /\/\d+/.test(path): {
            let fileJSON = readFile();
            let id = Number(path.match(/\d+/)[0]);
            JSON.parse(fileJSON).forEach(item => {
                if(item.id === id) {
                    response.setHeader('Content-Type', 'application/json');
                    response.write(JSON.stringify(item));
                }
            });
            if(!response.hasHeader('Content-Type')) {
                errorHandler(request, response, 1, `Студент с id ${id} не существует`);
            }
            response.end();
            break;
        }
        case path === '/backup': {
            fs.readdir('./backup', (err, files) => {
                response.setHeader('Content-Type', 'application/json');
                let json = [];
                for (let i = 0; i < files.length; i++) {
                    json.push({
                        id: i,
                        name: files[i]
                    });
                }
                response.end(JSON.stringify(json));
                console.log(files.length);
            });
            break;
        }
        default :{
                response.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(`error 404`);
                break;
        }
    }
};

