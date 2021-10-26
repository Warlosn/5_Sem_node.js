var http = require('http');
var fs   = require('fs');
var port = 5000;
//////////////////task1//////////////////	
http.createServer(function(request, response){
	
	if(request.url === '/html'){
		let html = fs.readFileSync('./index.html');
		response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
		response.end(html);		
	}
//////////////////task2//////////////////	
		else if(request.url === '/png'){

			const fname = './karl2.png';
			let png = null;

			fs.stat(fname,(err,stat)=>{//path и callback
				if(err)
				{
					console.log('error: ', err);
				}
					else
					{
						png = fs.readFileSync(fname)
                            response.writeHead(200,{'Content-Type':'image/png', 'Content-Length': stat.size});
							response.end(png,'binary');
					}
				});
		}
//////////////////task3//////////////////	
			else if(request.url === '/api/name'){

				const fname = 'FIO.txt';
                fs.stat(fname,(err,data)=> {
                    if(err) {
                        console.log('err:', err);
                    }
                    else {
                        text = fs.readFileSync(fname);
                            response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
                            response.end(text,'binary');
                    }
                });
			}
			//////////////////task4//////////////////	
				else if(request.url === '/xmlhttprequest'){

					const fname = 'xmlhttprequest.html';
					fs.stat(fname,(err,data)=> {
							if(err) {
								console.log('err:', err);
							}
							else {
								text = fs.readFile(fname, (err,data)=> {//(обратный вызов)Первый параметр этой функции хранит информацию 
									//об ошибке при наличии, а второй - собственно считанные данные.
									response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
									
									response.end(data,'binary');
								});
							}
						});
				}
			//////////////////task5//////////////////	
						else if(request.url === '/fetch'){

							const fname = 'fetch.html';
							fs.stat(fname,(err,data)=> {
									if(err) {
										console.log('err:', err);
									}
									else {
										text = fs.readFile(fname, (err,data)=> {
											response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
											
											response.end(data,'binary');
										});
									}
								});
						}
			//////////////////task6//////////////////	
							else if(request.url === '/jquery'){

								const fname = 'jquery.html';
								fs.stat(fname,(err,data)=> {
										if(err) {
											console.log('err:', err);
										}
										else {
											text = fs.readFile(fname, (err,data)=> {
												response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
												
												response.end(data,'binary');
											});
										}
									});
							}
								}).listen(port)

									console.log('Server is running on port: ' + port);
				
группы node.js
									
			


	
	
	
