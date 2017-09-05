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


// function printDir(){
//    console.log(__dirname);
// }
// 两秒后执行以上函数
// var t = setTimeout(printDir, 2000);
// clearTimeout(t);
// setInterval(printDir, 2000);

// // 输出当前目录
// console.log('当前目录: ' + process.cwd());

// // 输出当前版本
// console.log('当前版本: ' + process.version);

// // 输出内存使用情况
// console.log(process.memoryUsage());

//读取文件
// 异步读取
// fs.readFile('input.txt', function (err, data) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("异步读取: " + data.toString());
// });

// // 同步读取
// var data = fs.readFileSync('input.txt');
// console.log("同步读取: " + data.toString());

// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//   console.log("文件打开成功！");     
// });
// 
// fs.stat('input.txt', function (err, stats) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log(stats);
//    console.log("读取文件信息成功！");
   
//    // 检测文件类型
//    console.log("是否为文件(isFile) ? " + stats.isFile());
//    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
// });
// 
//写入文件
fs.writeFile('input.txt', '随便写点什么...！',  function(err) {
   if (err) {
       return console.error(err);
   }
 
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log(data.toString());
   });
});


