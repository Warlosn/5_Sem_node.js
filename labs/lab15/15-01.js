const http = require('http');
const PORT = 3000;
const handlers = require('./handlers');

const server = http.createServer();

server.on('request', async (req, res) => {
    try {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        switch (req.method) {
            case 'GET':
                await handlers.getHandler(req, res);
                break;
            case 'POST':
                await handlers.postHandler(req, res);
                break;
            case 'PUT':
                await handlers.putHandler(req, res);
                break;
            case 'DELETE':
                await handlers.deleteHandler(req, res);
                break;
        }
    } catch (err) {
        res.end(JSON.stringify({error: err.code, message: err.message}));
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});