var http = require("http");
var fs=require('fs');
var zlib = require('zlib');
// var express = require('express');

// fs.readFile('input.txt', function (err, data) {
//    if (err){
//       console.log(err.stack);
//       return;
//    }
//    console.log(data.toString());
// });
// console.log("程序执行完毕");

http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// var events = require('events'); 
// var emitter = new events.EventEmitter(); 
// emitter.on('someEvent', function(arg1, arg2) { 
// 	console.log('listener1', arg1, arg2); 
// }); 
// emitter.on('someEvent', function(arg1, arg2) { 
// 	console.log('listener2', arg1, arg2); 
// }); 
// emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');

// var buf = new Buffer(256);
// var len = buf.write("www.runoob.com");
// console.log("写入字节数 : "+  len);
// 

// // 创建一个可读流
// var readerStream = fs.createReadStream('input.txt');

// // 创建一个可写流
// var writerStream = fs.createWriteStream('output.txt');

// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writerStream);
// console.log("程序执行完毕");

// fs.createReadStream('input.txt')
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('input.txt.gz'));
  
// console.log("文件压缩完成。");


function printDir(){
   console.log(__dirname);
}
// 两秒后执行以上函数
// var t = setTimeout(printDir, 2000);
// clearTimeout(t);
// setInterval(printDir, 2000);

// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());

// util.inherits 实现继承
// util.inspect 对象转为字符串
// util.isArray(object) 判断是否为数组
// util.isRegExp(object) 是否满足正则
// util.isDate(object) 是否是一个日期
// util.isError(object) 是否是错误对象
