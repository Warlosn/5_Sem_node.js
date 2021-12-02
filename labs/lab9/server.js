var http = require('http');
var url = require('url');
var fs = require('fs');
let stat=require('./m07-01')('./static');
let parseString= require('xml2js').parseString;
let xmlbuilder= require('xmlbuilder');
const {parse} = require('querystring');
let mp = require('multiparty');
let writeHTTP405=(res)=>{
	res.statusCode = 405;
	res.statusMessage = 'Use another method';
	res.end('Use another method');
}
let http_handler2=(req,res)=>
{
	if(req.method=='GET'){
	if(stat.isStatic('html', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/html; charset=utf-8'});
	else if(stat.isStatic('css', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/css; charset=utf-8'});
	else if(stat.isStatic('js', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/javascript; charset=utf-8'});
	else if(stat.isStatic('png', req.url)) stat.sendFile(req,res, {'Content-Type': 'image/png; charset=utf-8'});
	else if(stat.isStatic('docx', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/msword; charset=utf-8'});
	else if(stat.isStatic('json', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/json; charset=utf-8'});
	else if(stat.isStatic('xml', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/xml; charset=utf-8'});
	else if(stat.isStatic('mp4', req.url)) stat.sendFile(req,res, {'Content-Type': 'video/mp4; charset=utf-8'});
	else stat.writeHTTP404(res);
	}
	else writeHTTP405(res);
}
let http_handler=(req,res)=>
{
	if(req.method=='GET'){
		
		//1 задание
        if(url.parse(req.url).pathname === '/Inform'){
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.end("1 Task");
		}
		
		//2 задание
        else if(url.parse(req.url).pathname === '/twopar'){
            let q= url.parse(req.url,true).query;
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			console.log('http.request: statusCode: ',res.statusCode);
			console.log(`x+y=${+q['x']+(+q['y'])}`);
    		res.end(`2 Task`);
        }
        else {
            http_handler2(req,res);
        }
    }
    else if(req.method=='POST')
    {
		//3 задание
        if(url.parse(req.url).pathname === '/threepar'){
            let body='';
            req.on('data',chunk=>{body+=chunk.toString();});
            req.on('end',()=>{
                let o = parse(body);
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
				res.end(`x+y+s=${o['x']+o['y']+o['s']}`);
            });
		}
		
		//4 задание
        else if(url.parse(req.url).pathname=== '/JSON')
		{
			let result='';
			let body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
				console.log(body);
				let os = JSON.parse(body);
				result={
					__comment:"Ответ.Лабораторная работа 8/10",
					x_plus_y:os.x+os.y,
					Concatination_s_o:os.s+'.'+os.o.surname+","+os.o.name,
					Length_m:os.m.length
				};
				res.writeHead(200,{'Content-Type': 'application/json'});
				console.log(result);
				 res.end(JSON.stringify(result));}
				,function(err,reply){
					console.log(err && err.stack);
					
                });
			}
			
			//5 задание
            else if(url.parse(req.url).pathname=== '/XML')
		    {
			let sumx=0;
			let resultm='';
			let id='';
			let body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
				console.log(body);
				parseString(body,function(err,result)
				{
					id=result.request.$.id;
					console.log(id);
					result.request.m.map((e,i)=>{
						resultm+=e.$.value;
                    });
                    result.request.x.map((e,i)=>{
						console.log(e.$.value);
						sumx+=(+e.$.value);
					});
				});
				let xmlDoc = xmlbuilder.create('response').att('id', id);
                xmlDoc.ele('sum').att('element', 'x').att('result', sumx).up().ele('concat').att('element', 'm').att('result', resultm);
				res.writeHead(200,{'Content-Type': 'application/xml'});
				res.end(xmlDoc.toString());}
				,function(err,reply){
					console.log(err && err.stack);
					console.dir(reply);
				});   
        
			}
			
			//6 задание
            else if(url.parse(req.url).pathname=== '/UploadFile')
			{
				let result='';
				let form =new mp.Form({uploadDir:'./static'});
				form.on('field',(name,value)=>{
					console.log('------------field-------------');
					console.log(name,value);
					result+=`<br/>---${name}= ${value}`;
				});
				form.on('file', (name, file)=>{
					console.log('-----file ------------');
					console.log(name,file);
					result+=`<br/>---${name}= ${file.originalFilename}: ${file.path}`;
				});
                form.parse(req);
            }
    }
}
var server=http.createServer(function (req, res){
    http_handler(req,res);
}).listen(5000);