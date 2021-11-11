var http = require('http')
var url = require('url')
var fs = require('fs')
var data = require('./index.js')

var db = new data.DB()
let reqCount = 0;
let comCount = 0;

db.on('GET', (req, resp)=>{
    reqCount++;
    console.log('GET'); 
    resp.writeHead(200, {'Content-Type': 'application/json; charset = utf-8', "Access-Control-Allow-Origin": "*" });
    resp.end(JSON.stringify(db.select()))
})

db.on('POST',  (req, resp)=>{
    console.log('POST'); 
    reqCount++;
    req.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.getIndex();
        db.insert(row);
        resp.end(JSON.stringify(row));
        console.log(row);
    });
})

db.on('PUT', (req, resp)=>{
    console.log('PUT')
    reqCount++;
    req.on('data', data => {
        let row = JSON.parse(data);
        db.update(row);
        resp.writeHead(200, {'Content-Type': 'application/json; charset = utf-8', "Access-Control-Allow-Origin": "*" });
        resp.end(JSON.stringify(row));
    });
})

db.on('DELETE', (req, resp)=>{
    console.log('DELETE')
    reqCount++;
    if (url.parse(req.url, true).query.id !== null)
    {
        let index = url.parse(req.url, true).query.id

            let row = db.delete(index);
            resp.end(JSON.stringify(row));
        
    }
})

db.on('COMMIT', () => {
    comCount++;
    db.commit();
});

let server = http.createServer(function (req, resp) {
	if(url.parse(req.url).pathname === '/api/db') {
		db.emit(req.method, req, resp);
	}
	if(url.parse(req.url).pathname === '/') {
        let page = fs.readFileSync('./index.html');
        resp.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        resp.end(page);
    }
    if(url.parse(req.url).pathname === '/api/ss') {
        resp.writeHead(200, {'Content-Type':'application/json'});
        resp.end(JSON.stringify(printStatic()));
    }
}).listen(5000);

let buf = ""
let timerSd = null;
let timerSc = null;
let timerSs = null;
process.stdin.setEncoding('utf-8');
process.stdin.unref();
process.stdin.on('readable', () => {
    let chunk = null;
    while ((chunk = process.stdin.read()) != null) {
      if (chunk.trim().charCodeAt()) buf += chunk.trim()
      else
      {
          let sec = Number(buf.trim().replace(/[^\d]/g, ''));
          console.log(sec);
          if (buf.slice(0, 2) == 'sd') {
             let sec = Number(buf.trim().replace(/[^\d]/g, ''));
             if(sec) {
                clearTimeout(timerSd);
                timerSd = setTimeout(() =>  {server.close()}, sec * 1000);
                console.log(`Server exit after ${sec} sec`);
            }
            if(!sec && buf.trim().length > 2) {
                console.error("wrong parameter");
            }
            if(buf.trim().length === 2) {
                clearTimeout(timerSd);
                console.log('Undo exit server');
            }
          }
          else if (buf.slice(0, 2) == 'sc') {
            let sec = Number(buf.trim().replace(/[^\d]/g, ''));
            if(sec) {
                clearTimeout(timerSc);
                timerSc = setInterval( () => { db.emit('COMMIT') }, sec * 1000);
                timerSc.unref();
            }
            if(!sec && buf.trim().length > 2) {
                console.error("wrong parameter");
            }
            if(buf.trim().length === 2) {
                clearTimeout(timerSc);
                console.log('Undo commit');
            }
          } else if (buf.slice(0, 2) == 'ss') {
            let sec = Number(buf.trim().replace(/[^\d]/g, ''));
            if(sec) {
                clearTimeout(timerSs);
                timerSs = setInterval( () => { process.stdout.write(printStatic()); clearTimeout(timerSs)}, sec * 1000);
                timerSs.unref();
            }
            if(!sec && buf.trim().length > 2) {
                console.error("wrong parameter");
            }
            if(buf.trim().length === 2) {
                clearTimeout(timerSs);
                console.log('Undo statistics');
            }
          }
          buf=""
  }
    }
})


function printStatic()
{
    let start =(new Date(Date.now())).toISOString().slice(0,10);
    return 'start: '+ start + ', finish: ' + (new Date(Date.now())).toISOString().slice(0,10) + ', request: ' + reqCount + ', commit: ' + comCount + '\n';
}