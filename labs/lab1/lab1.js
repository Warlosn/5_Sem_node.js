
// получаем модуль небходимый для создания сервера, require() - загрузка модуля
var http = require('http');


http.createServer(function (request, response){
    response.writeHead(200, {'Content-type': 'text/html'}); //статусный код и набор заголовков
    response.end('<h1>Hello World</h1>\n'); 
}).listen(3000);  
console.log('Server running at http://localhost:3000/');



let h = (r)=>{
    let rc ='';
    for(key in r.headers) 
        rc += '<h3>' + key + ':' + r.headers[key] + '</h3>'
    return rc;
}

http.createServer(function(request, response){
    let b ='';
    request.on('data', str => {
        b += str; 
        console.log('data:',b); 
    })
    response.writeHead(200,{'Content-type': 'text/html; charset = utf-8'});
    request.on('end', () => response.end(
                                        '<!DOCTYPE html> <html> <head> </head>' +
                                        '<body>' +
                                        '<h1>Request Structure</h1>' +
                                        '<h2>' + 'Method: ' + request.method + '</h2>' +
                                        '<h2>' + 'URI: ' + request.url + '</h2>' +
                                        '<h2>' + 'Version: ' + request.httpVersion + '</h2>' +
                                        '<h2>' + 'Headers: ' + '</h2>' +
                                        h(request) +
                                        '<h2>' + 'Request body: ' + b + '</h2>' +
                                        '</body>' +
                                        '</html>'
                                        )
             )
}).listen(3001);

console.log('Server running at http://localhost:3001/');
