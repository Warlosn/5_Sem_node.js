const http = require('http');
const query = require('querystring');
const url = require('url');

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  response.end(`<h1>x = ${+url.parse(request.url, true).query.x}, y = ${+url.parse(request.url, true).query.y}</h1>`);
}).listen(5000);

let parameters = query.stringify({
  x: 3,
  y: 9
});
let path = `/?${parameters}`;

let options = {
  host: 'localhost',
  path: path,
  port: 5000,
  method: 'GET'
};

let request = http.request(options, (response) => {
  console.log('Status:', response.statusCode);

  let responseData = '';
  response.on('data', (chunk) => {
    console.log(responseData += chunk.toString('utf-8'));
  });
});

request.on('error', (e) => {
  console.log('Error: ', e.message);
});
request.end();