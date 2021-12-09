const http = require('http');

http.createServer((request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', () => {
    response.writeHead(200, {
      'Content-type': 'text/html; charset=utf-8'
    });
    data = JSON.parse(data);
    response.end(`<h1>x = ${data.x}, y = ${data.y}, s = ${data.s}</h1>`);
  });

}).listen(5000);

let parameters = JSON.stringify({
  x: 2,
  y: 3,
  s: 'Ivan'
});

let options = {
  host: 'localhost',
  path: '/',
  port: 5000,
  method: 'POST',
  headers: {
    'Content-Type': 'text/html',
    'Accept': 'text/html'
  }
};

let request = http.request(options, (response) => {
  console.log('Status:', response.statusCode);

  let responseData = '';
  response.on('data', (chunk) => {
    responseData += chunk.toString('utf-8');

  });
  response.on('end', () => {
    console.log(responseData);
  });
});

request.on('error', (e) => {
  console.log('Error: ', e.message);
});
request.end(parameters);