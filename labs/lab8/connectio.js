var http = require('http');

let k = 0;
let c = 0;
let s = '';

let http_handler = (req, res)=>{
        console.log(`request url:${req.utl},#`, k++);
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.write('<h2>Http-server</h2>');
        s += `url = ${req.utrl}, request/response # ${c} - ${k}<br/>`;
        res.end(s);
};

let server = http.createServer();

server.keepAliveTimeout = 10000;
server.on('connection', (socket)=>{
        console.log(`connection: server.keepAliveTimeout = ${server.keepAliveTimeout}`, c++);
        s += `<h2>connection: # ${c}</h2>`;
});

    server.on('request',http_handler);

    server.listen(3000, (v)=>{console.log('server.listen(3000)')})
    .on('error', (e)=>{console.log('server.listen(3000):error: ', e.code)})