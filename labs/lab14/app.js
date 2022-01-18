const http = require('http');
const fs = require('fs');

const getHandler = require('./resourse/js/getHandler');
const postHandler = require('./resourse/js/postHandler');
const putHandler = require('./resourse/js/putHandler');
const deleteHandler = require('./resourse/js/deleteHandler');

http.createServer((req, res) => {
    switch(req.method) {
        case 'GET': getHandler(req, res); break;
        case 'POST': postHandler(req, res); break;
        case 'PUT': putHandler(req, res); break;
        case 'DELETE': deleteHandler(req, res); break;
    }
}).listen(5000);