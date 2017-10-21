var http=require('http');
var url=require('url');

http.createServer(function(req,res){
	var pathname=url.parse(req.url).pathname;

	if(pathname==='/'){
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
		res.end('Home Page\n');		
	}else if(pathname==='/about'){
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
		res.end('about Page\n');			
	}else if(pathname==='/redirect'){
		res.writeHead(301,{
			'Location':'/'
		});
		res.end();			
	}else{
		res.writeHead(404,{
			'Content-type':'text/plain'
		});
		res.end('Page not found\n');			
	}
	
}).listen(3000,'127.0.0.1');
console.log('服务运行在127.0.0.1中');