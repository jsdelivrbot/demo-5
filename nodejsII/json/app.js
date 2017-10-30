var http=require('http');
var obj={
	name:'shiwei',
	age:'26'
}
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify(obj));

}).listen(3000,'127.0.0.1');
console.log('服务运行在127.0.0.1:3000');