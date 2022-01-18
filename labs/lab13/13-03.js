const net = require('net');

let HOST = '0.0.0.0';
let PORT = 4000;

let sum = 0;

let Server = net.createServer();
Server.on('connection', (sock) => {
    console.log(`Server connected: ${sock.remoteAddress}:${sock.remotePort}`);

    sock.on('data', (data) => {
        console.log(`Server data: ${data.readInt32LE()}`);

        sum += data.readInt32LE();
        console.log(`Sum: ${sum}`);
    });

    let buffer = Buffer.alloc(4);
    let writer = setInterval(() => {
        buffer.writeInt32LE(sum, 0);
        sock.write(buffer);
    }, 5000);

    sock.on('close', data => {
        clearInterval(writer);
        console.log("Server closed");
    });

    sock.on('error', (e) => {
        console.log(`Server error: ${e}`);
    });

});

Server.on('listening', () => {
    console.log(`Server connected: ${HOST}:${PORT}`);
});
Server.on('error', (e) => {
    console.log(`TCP-Server error: ${e}`);
});

Server.listen(PORT, HOST);