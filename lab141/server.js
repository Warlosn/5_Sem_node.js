const http      = require('http');
const url       = require('url');
const fs        = require('fs');
const Database  = require('./database');

const database = new Database();

function get_handler(request = new http.IncomingMessage(), response = new http.ServerResponse()) {
    switch (request.url) {
        case '/':
            let html = fs.readFileSync('./index.html');
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(html);
            break;
        case '/api/faculties':
            database.get_faculties().then(records => {
                sendResponseSuccess(
                    response,
                    'application/json',
                    JSON.stringify(records.recordset)
                );
            });
            break;
        case '/api/pulpits':
            database.get_pulpits().then(records => {
                sendResponseSuccess(
                    response,
                    'application/json',
                    JSON.stringify(records.recordset)
                );
            });
            break;
        case '/api/subjects':
            database.get_subjects().then(records => {
                sendResponseSuccess(
                    response,
                    'application/json',
                    JSON.stringify(records.recordset)
                );
            });
            break;
        case '/api/auditoriumstypes':
            database.get_auditoriumstypes().then(records => {
                sendResponseSuccess(
                    response,
                    'application/json',
                    JSON.stringify(records.recordset)
                );
            });
            break;
        case '/api/auditoriums':
            database.get_auditoriums().then(records => {
                sendResponseSuccess(
                    response,
                    'application/json',
                    JSON.stringify(records.recordset)
                );
            });
            break;
        default:
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.end('Wrong api request');
            break;
    }
}

function post_handler(request, response) {
    let data = ''
    switch (request.url) {
        case '/api/faculties':
            request.on('data', (chunk) => {
                data += chunk;
            });
            
            request.on('end', () => {
                data = JSON.parse(data);

                database.get_faculty(data.faculty)
                .then(doc => {
                    if (doc.recordset.length != 0) {
                        console.log('Such faculty already exists');
                        sendResponseError(response, 400, 'Such faculty already exists');
                    }
                    else{
                        database.post_faculties(data.faculty, data.faculty_name)
                        .then(records => {
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error=>{
                            console.log(error) 
                            sendResponseError(response, 400, error)
                        });
                    }
                })            
            });
            break;
        case '/api/pulpits':
           
            request.on('data', (chunk) => {
                data += chunk;
            });
           
            request.on('end', () => {
                data = JSON.parse(data);
                console.log(data)

                database.get_pulpit(data.pulpit)
                .then(doc => {
                    if (doc.recordset.length != 0) {
                        console.log('Such pulpit already exists');
                        sendResponseError(response, 400, 'Such pulpit already exists');
                    }
                    else{
                        database.post_pulpits(data.pulpit, data.pulpit_name, data.faculty)
                        .then(records => {
                            console.log(records)
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error=>{
                            console.log(error) 
                            sendResponseError(response, 400, error)
                        });
                     }
                });
            });
            break;
        case '/api/subjects':
            request.on('data', (chunk) => {
                data += chunk;
            });
            
            request.on('end', () => {
                data = JSON.parse(data);

                database.get_subject(data.subject)
                .then(doc => {
                    if (doc.recordset.length != 0) {
                        console.log('Such subject already exists');
                        sendResponseError(response, 400, 'Such subject already exists');
                    }
                    else{
                    database.post_subjects(data.subject, data.subject_name, data.pulpit)
                    .then(records => {
                        sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                    })
                    .catch(error => sendResponseError(response, 400, error));
                }
            });
        });
            break;
        case '/api/auditoriumstypes':
            request.on('data', (chunk) => {
                data += chunk;
            });
            
            request.on('end', () => {
                data = JSON.parse(data);

                database.get_auditorium_type(data.auditorium_type)
                .then(doc => {
                    if (doc.recordset.length != 0) {
                        console.log('Such auditorium type already exists');
                        sendResponseError(response, 400, 'Such auditorium type already exists');
                    }
                    else{
                        database.post_auditoriumstypes(data.auditorium_type, data.auditorium_typename)
                        .then(records => {
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error => sendResponseError(response, 400, error));
                    }
                });
            });
            break;
        case '/api/auditoriums':
            request.on('data', (chunk) => {
                data += chunk;
            });
            
            request.on('end', () => {
                data = JSON.parse(data);

                database.get_auditorium(data.auditorium)
                .then(doc => {
                    if (doc.recordset.length != 0) {
                        console.log('Such auditorium already exists');
                        sendResponseError(response, 400, 'Such auditorium already exists');
                    }
                    else{
                        database.post_auditoriums(data.auditorium, data.auditorium_name, data.auditorium_capacity, data.auditorium_type)
                        .then(records => {
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error => sendResponseError(response, 400, error));
                    }
                });
            });
            break;
        default:
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.end('Wrong api request');
            break;
    }
}

function put_handler(request, response) {
    let data = '';
    switch (request.url) {
        case '/api/faculties':
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                data = JSON.parse(data);

                database.get_faculty(data.faculty)
                .then(doc => {
                    if (doc.recordset.length == 0) {
                        console.log('Faculty not found');
                        sendResponseError(response, 400, 'Faculty not found');
                    }
                    else{
                        database.put_faculties(data.faculty, data.faculty_name)
                        .then(records => {
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error => sendResponseError(response, 400, error));
                    }
                })     
            });
            break;
        case '/api/pulpits':
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                data = JSON.parse(data);

                database.get_pulpit(data.pulpit)
                .then(doc => {
                    if (doc.recordset.length == 0) {
                        console.log('Pulpit not found');
                        sendResponseError(response, 400, 'Pulpit not found');
                    }
                    else{                        
                        database.put_pulpits(data.pulpit, data.pulpit_name, data.faculty)
                        .then(records => {
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error => sendResponseError(response, 400, error));
                    }
                })   
            });
            break;
        case '/api/subjects':
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                data = JSON.parse(data);

                database.get_subject(data.subject)
                .then(doc => {
                    if (doc.recordset.length == 0) {
                        console.log('Subject not found');
                        sendResponseError(response, 400, 'Subject not found');
                    }
                    else{
                        database.put_subjects(data.subject, data.subject_name, data.pulpit)
                        .then(records => {
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error => sendResponseError(response, 400, error));
                    }
                })                       
            });
            break;
        case '/api/auditoriumstypes':
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                data = JSON.parse(data);

                database.get_auditorium_type(data.auditorium_type)
                .then(doc => {
                    if (doc.recordset.length == 0) {
                        console.log('Auditorium Type not found');
                        sendResponseError(response, 400, 'Auditorium Type not found');
                    }
                    else {
                    database.put_auditoriumstypes(data.auditorium_type, data.auditorium_typename)
                    .then(records => {
                        sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                    })
                    .catch(error => sendResponseError(response, 400, error));
                    }
                })                
            });
            break;
        case '/api/auditoriums':
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                data = JSON.parse(data);

                database.get_auditorium(data.auditorium)
                .then(doc => {
                    if (doc.recordset.length == 0) {                       
                        sendResponseError(response, 400, 'Auditorium not found');
                    }
                    else{
                        database.put_auditoriums(data.auditorium, data.auditorium_name, data.auditorium_capacity, data.auditorium_type)
                        .then(records => {
                            sendResponseSuccess(response, 'application/json', JSON.stringify(data));
                        })
                        .catch(error => sendResponseError(response, 400, error));
                    }
                })             
            });
            break;
        default:
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.end('Wrong api request');
            break;
    }
}

function delete_handler(request, response) {
    let path = decodeURI(url.parse(request.url).pathname);
    let pathElements = path.split('/');

    switch ('/api/' + pathElements[2]) {
        case '/api/faculties':
            database.get_faculty(pathElements[3])
            .then(doc => {
                if (doc.recordset.length == 0) {
                    console.log('Faculty not found');
                    sendResponseError(response, 400, 'Faculty not found');
                }
                else{
                    database.delete_faculties(pathElements[3])
                    .then(records => {
                        sendResponseSuccess(response, 'text/plain', 'Deleted')
                    })
                    .catch(error => sendResponseError(response, 400, error));
                }
            })
            break;
        case '/api/pulpits':
            database.get_pulpit(pathElements[3])
            .then(doc => {
                if (doc.recordset.length == 0) {
                    console.log('Pulpit not found');
                    sendResponseError(response, 400, 'Pulpit not found');
                }
                else{
                    database.delete_pulpits(pathElements[3])
                    .then(records => {
                        sendResponseSuccess(response, 'text/plain', 'Deleted')
                    })
                    .catch(error => sendResponseError(response, 400, error));        
                }
            })
            break;

        case '/api/subjects':
            database.get_subject(pathElements[3])
            .then(doc => {
                if (doc.recordset.length == 0) {
                    console.log('Subject not found');
                    sendResponseError(response, 400, 'Subject not found');
                }
                else{
                    database.delete_subjects(pathElements[3])
                    .then(records => {
                        sendResponseSuccess(response, 'text/plain', 'Deleted')
                    })
                    .catch(error => sendResponseError(response, 400, error));  
                }
            })
              break;
        case '/api/auditoriumstypes':
            database.get_auditorium_type(pathElements[3])
            .then(doc => {
                if (doc.recordset.length == 0) {
                    console.log('Auditorium Type not found');
                    sendResponseError(response, 400, 'Auditorium Type not found');
                }
                else{
                    database.delete_auditoriumstypes(pathElements[3])
                    .then(records => {
                        sendResponseSuccess(response, 'text/plain', 'Deleted');
                    })
                    .catch(error => sendResponseError(response, 400, error));        
                }
            })           
             break;

        case '/api/auditoriums':
            database.get_auditorium(pathElements[3])
            .then(doc => {
                if (doc.recordset.length == 0) {
                    console.log('Auditorium Type not found');
                    sendResponseError(response, 400, 'Auditorium Type not found');
                }
                else{
                    database.delete_auditoriums(pathElements[3])
                    .then(records => {
                        sendResponseSuccess(response, 'text/plain', 'Deleted');
                    })
                    .catch(error => sendResponseError(response, 400, error));        
                }
            })           
           break;
           
        default:
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.end('Wrong api request');
            break;
    }
}

http.createServer((request, response) => {
    try {
        switch (request.method) {
            case 'GET':
                get_handler(request, response);
                break;
            case 'POST':
                post_handler(request, response);
                break;
            case 'PUT':
                put_handler(request, response);
                break;
            case 'DELETE':
                delete_handler(request, response);
                break;
            default:
                sendResponseError(response, 400, 'Wrong HTTP-Method');
                break;
        }
    } catch (error) {
        sendResponseError(response, 400, error);
        
    }
}).listen(5000);



function sendResponseSuccess(response = new http.ServerResponse(), mimeType, data) {
    response.writeHead(200, { 'Content-Type': mimeType });
    response.end(data);
}

function sendResponseError(response = new http.ServerResponse(), statusCode, errorMessage) {
    response.statusCode = statusCode;
    response.end(`${errorMessage}`);
}