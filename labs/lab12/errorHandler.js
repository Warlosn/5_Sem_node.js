module.exports = (request, response, code, message) => {
    response.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
    response.end(`{"error": "${code}", "message": "${message}"}`);
};