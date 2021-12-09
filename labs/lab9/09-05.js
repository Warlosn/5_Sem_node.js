const http = require('http');
const parseString = require('xml2js').parseString;
const xmlbuilder = require('xmlbuilder');

http.createServer((request, responce) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    responce.writeHead(200, {
      'Content-type': 'text/xml'
    });
    parseString(data, (err, result) => {
      let xSum = 0;
      let mSum = '';
      result.request.x.forEach((p) => {
        xSum += parseInt(p.$.value);
      });
      result.request.m.forEach((p) => {
        mSum += p.$.value;
      });
      let xmlDoc = xmlbuilder.create('response').att('id', '1');
      xmlDoc.ele('result').att('value', xSum.toString()).up()
        .ele('concat').att('value', mSum.toString()).up();
      responce.end(xmlDoc.toString({
        pretty: true
      }));
    });
  });
}).listen(5000);

let parameters = xmlbuilder.create('request').att('id', '1');
parameters.ele('x').att('value', '1').up()
  .ele('x').att('value', '2').up()
  .ele('m').att('value', 'x').up()
  .ele('m').att('value', 'y').up()
  .ele('m').att('value', 'z').up();

let options = {
  host: 'localhost',
  path: '/',
  port: 5000,
  method: 'POST',
  headers: {
    'content-type': 'text/xml',
    'accept': 'text/xml'
  }
};

let request = http.request(options, (responce) => {
  console.log('Status:', responce.statusCode);

  let responseData = '';
  responce.on('data', (chunk) => {
    responseData += chunk;
  });
  responce.on('end', () => {
    console.log(responseData);
    parseString(responseData, (err, str) => {
      if (err) {
        console.log('xml parser error');
      } else {
        console.log('sum = ', str.response.result);
        console.log('concat = ', str.response.concat);
      }
    });
  });
});

request.on('error', (e) => {
  console.log('Error: ', e.message);
});
request.end(parameters.toString({
  pretty: true
}));