const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;

    switch(true)
    {
        case path == '/': 
            res.end(fs.readFileSync('./resourse/views/index.html'));
            break;
        case path == '/api/faculties': 
        DB.getFaculties().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
            break;
        case path == '/api/pulpits':
        DB.getPulpits().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
            break;
        case path == '/api/subjects': 
        DB.getSubjects().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
            break;
        case path == '/api/auditoriumtypes': 
        DB.getAuditoriumsTypes().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
        break;
        case path == '/api/auditoriums':
        DB.getAuditoriums().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
        break;
    }
}