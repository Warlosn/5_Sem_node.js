const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
let data_json = '';
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    let path_params = path.split('/');
    switch('/api/' + path_params[2])
    {
        case '/api/faculties':
            res.writeHead(200, {'Content-Type': 'application/json'});
            DB.getFaculty(path_params[3]).
                then((resl)=>{if(resl.recordset.length == 0) throw 'No such faculty'
                else DB.deleteFaculties(path_params[3]).then(records => {
                    res.end(path_params[3])
                }).catch(error => {write_error_400(res, error)});}).
                catch(error=>{write_error_400(res,error)});

        break;
        case '/api/pulpits':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.getPulpit(path_params[3]).
            then((resl)=>{if(resl.recordset.length == 0) throw 'No such pulpit'
            else DB.deletePulpits(path_params[3]).then(records => {
                res.end(path_params[3])
                console.log(`deleted ${path_params[3]}`);
            }).catch(error => {write_error_400(res, error)});
            }).
            catch(error=>{write_error_400(res,error)});

        break;
        case '/api/subjects':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.getSubject(decodeURI(path_params[3])).
            then((resl)=>{if(resl.recordset.length == 0) throw 'No such subject'
                    else DB.deleteSubjects(decodeURI(path_params[3])).then(records => {
                        res.end(path_params[3])
                        }).catch(error => {write_error_400(res, error)});}).
            catch(error=>{write_error_400(res,error)});

        break;
        case '/api/auditoriumtypes':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.deleteAuditoriums_Types(path_params[3]).then(records => {
                res.end(path_params[3])
            }).catch(error => {write_error_400(res, error)});
            break;
        case '/api/auditoriums':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.getAuditorim(path_params[3]).
            then((resl)=>{if(resl.recordset.length == 0) throw 'No such auditorium'
                else DB.deleteAuditoriums(path_params[3]).then(records => {
                    res.end(path_params[3])
                }).catch(error => {write_error_400(res, error)});}).
            catch(error=>{write_error_400(res,error)});
            break;
    }
}
function write_error_400(res, err) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    res.end(JSON.stringify({error :err}));
}