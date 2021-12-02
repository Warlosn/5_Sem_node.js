var http =require('http');
var fs= require('fs');
let bound='SHU-SHU'
let body=`--${bound}\r\n`;
body+='Content-Disposition:form-data; name="file"; Filename="MyFile.txt"\r\n';
body+='Content-Type:text/plain\r\n\r\n';
body+=fs.readFileSync('MyFile.txt');
body+=`\r\n--${bound}--\r\n`;
let path=`/UploadFile`;
console.log(path);
let options= {
    host: 'localhost',
    path: path,
    port: 5000,
    method:'POST',
    headers:
    {'Content-Type':'multipart/form-data; boundary='+bound}
}
const req = http.request(options,(res)=> {
    let data = '';
    res.on('data',(chunk) =>
    {
        console.log('http.request: data: body=', data+=chunk.toString('utf-8'));
    });
    res.on('end',()=>{ console.log('http.request: end: body=', data);
    }); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);
});
req.end(body);