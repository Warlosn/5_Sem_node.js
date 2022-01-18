const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
let data_json = '';
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    switch(true)
    {
        case path == '/api/faculties':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                console.log(data_json);
                data_json = JSON.parse(data_json);
                console.log(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.postFacultes(data_json.faculty, data_json.facultyName).then(records => {
                    res.end(JSON.stringify(data_json))
                    data_json = '';
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case path == '/api/pulpits':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', ()=>{
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.postPulpits(data_json.pulpit, data_json.pulpit_name, data_json.faculty).then(records => {
                    res.end(JSON.stringify(data_json));
                    data_json = '';
                    console.log(`post: ${data_json.pulpit} -  ${data_json.pulpit_name} -  ${data_json.faculty}`);
                }).catch(error => {write_error_400(res, error)});
            })
            break;
        case path === '/api/subjects':
            req.on('data', chunk => {
                data_json += chunk;
            })
            req.on('end', () => 
            {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.postSubjects(data_json.subject, data_json.subject_name, data_json.pulpit).then(records => {
                    res.end(JSON.stringify(data_json));
                    data_json = '';
                }).catch(error => {write_error_400(res, error)});
            })
            break;
        case path === '/api/auditoriumtypes':
            req.on('data', chunk => {
                data_json += chunk;
            })
            req.on('end', () => 
            {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.postAuTypes(data_json.auditorium_type, data_json.auditorium_typename).then(records => {
                    res.end(JSON.stringify(data_json));
                    data_json = '';
                }).catch(error => {write_error_400(res, error)});
            })
            break;
            case path === '/api/auditoriums':
                req.on('data', chunk => {
                    data_json += chunk;
                });
                req.on('end', () => {
                    data_json = JSON.parse(data_json);
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    DB.postAuditoriums(data_json.auditorium, data_json.auditorium_name, data_json.auditorium_capacity, data_json.auditorium_type).then(records => {
                        res.end(JSON.stringify(data_json))
                        data_json = '';
                    }).catch(error => {write_error_400(res, error)});
                });
                break;
    }
}
function write_error_400(res, err) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    res.end(JSON.stringify({error :err}));
    data_json = '';
}