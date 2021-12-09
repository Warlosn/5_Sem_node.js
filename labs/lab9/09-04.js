const http = require('http');

http.createServer((request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    response.writeHead(200, {
      'Content-type': 'application/json; charset=utf-8'
    });

    data = JSON.parse(data);
    let jsonResponse = {};
    jsonResponse.__comment = 'Response: ' + data.__comment;
    jsonResponse.x_plus_y = data.x + data.y;
    jsonResponse.Concatenation_s_o = data.s + ' ' + data.o.surname + ' ' + data.o.name;
    jsonResponse.Length_m = data.m.length;

    response.end(JSON.stringify(jsonResponse));
  });
}).listen(5000);

let parameters = JSON.stringify({
  __comment: "Lab9",
  x: 2,
  y: 3,
  s: "Student:",
  m: [1, 2, 3],
  o: {
    surname: "Grishin",
    name: "Ivan"
  }
});

let options = {
  host: 'localhost',
  path: '/',
  port: 5000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
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
    console.log(JSON.parse(responseData));
  });
});

request.on('error', (e) => {
  console.log('Error: ', e.message);
});
request.end(parameters);