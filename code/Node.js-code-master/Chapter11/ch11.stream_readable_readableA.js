/**
 * Created by king on 15-6-3.
 *
 * ch11.stream_readable_readableA.js
 */
console.info("------   stream readable event   ------");
console.info();
var fs = require('fs'); // TODO: 引入文件系统模块
/**
 * 调用文件系统（fs）模块的createReadStream()方法创建可读（Readable）流
 */
var rs = fs.createReadStream('data/createReadStream.txt');
/**
 * 流（Stream）模块 --- 'readable'事件处理函数
 */
rs.on('readable', function() {
    console.log('readable event emitted.');
    console.info();
});