const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    response.end();
  }
}).listen(5000);

let options = {
  host: 'localhost',
  path: '/',
  port: 5000,
  method: 'GET'
};

let request = http.request(options, (response) => {
  console.log('Status:', response.statusCode);
  console.log('Status message:', response.statusMessage);
  console.log('IP address of remote server:', response.socket.remoteAddress);
  console.log('Port of remote server:', response.socket.remotePort);

  let responseData = '';
  response.on('data', (chunk) => {
    console.log(responseData += chunk.toString('utf-8'));
  });

});

request.on('error', (e) => {
  console.log('Error: ', e.message);
});
request.end();