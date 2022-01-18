const net = require('net');

let HOST = '0.0.0.0';
let PORT = 6000;

let sum = 0;

let connections = new Map();

let Server = net.createServer();
Server.on('connection', (sock) => {

    sock.id = (new Date()).toISOString();
    connections.set(sock.id, 0);
    console.log(`Server connected: ${sock.remoteAddress}:${sock.remotePort}`);

    sock.on('data', (data) => {
        console.log(`Server data: ${data.readInt32LE()}`);

        sum = data.readInt32LE() + connections.get(sock.id);
        connections.set(sock.id, sum);
        console.log(`Sum: ${sum}`);
        sum = 0;
    });

    let buffer = Buffer.alloc(4);
    let writer = setInterval(() => {
        buffer.writeInt32LE(connections.get(sock.id), 0);
        sock.write(buffer);
    }, 5000);

    sock.on('close', data => {
        clearInterval(writer);
        connections.delete(sock.id);
        console.log("Server closed");
    });

    sock.on('error', (e) => {
        console.log(`Server error: ${e}`);
        connections.delete(sock.id);
    });

});

Server.on('listening', () => {
    console.log(`Server connected: ${HOST}:${PORT}`);
});
Server.on('error', (e) => {
    console.log(`TCP-Server error: ${e}`);
});

Server.listen(PORT, HOST);