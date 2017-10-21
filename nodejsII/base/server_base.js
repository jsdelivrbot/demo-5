var http=require('http');//依赖http服务
http.createServer(function(req,res){//建立服务
	res.writeHead(200,{'Content-Type':'text/plain'});//响应头
	res.end('hallo world\n');//返回内容

}).listen(3000,'127.0.0.1');//监听IP地址及端口号
console.log('服务运行在http://127.0.0.1:3030/');