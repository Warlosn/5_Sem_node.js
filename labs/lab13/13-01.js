const net = require('net');

let HOST = '0.0.0.0';
let PORT = 40000;

net.createServer((sock) => {
    sock.on('error', (e) => {
        console.log(`Server error: ${e}`);
    });
    
    console.log('Server CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    sock.on('data', (data) => {
        console.log('Sever DATA:' + data);
        sock.write('ECHO: ' + data);
    });

    sock.on('close', ()=>{console.log('Ser CLOSED: ');});

}).listen(PORT, HOST);

console.log('TCP-server ' + HOST + ':' + PORT);