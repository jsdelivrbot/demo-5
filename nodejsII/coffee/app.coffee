http=require 'http'
http.createServer (req, res) ->
	res.writeHead 200,'Content-Type':'text/plain'
	res.end 'Hello world\n'
.listen 3000,'127.0.0.1'
console.log '服务运行在http://127.0.0.1:3000/'