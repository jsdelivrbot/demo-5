/**
 * Created by king on 15-5-18.
 *
 * ch10.udp_broadcast_client.js
 */
console.info("------   UDP broadcast   ------");
console.info();
var dgram = require('dgram');   // TODO: 引入网络(UDP)模块
var HOST = '255.255.255.255';     // TODO: 定义服务器地址
var PORT = 12345;       // TODO: 定义端口号
var message = new Buffer('UDP Client to Server : Hello Server!');
/**
 * 创建UDP客户端
 */
console.info('Now create UDO Client...');
console.info();
/**
 * 使用dgram.createSocket函数方法创建一个UDP客户端
 */
var client = dgram.createSocket('udp4');
/**
 * 绑定套接字方法函数
 */
client.bind(function () {
    client.setBroadcast(true);
});
/**
 * 向服务器发送UDP数据报
 */
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    console.info();
    console.info(bytes);
    console.info();
    client.close();
});
/**
 * 为UDP客户端添加一个"close"事件处理函数
 */
client.on('close', function() {
    console.log('client disconnected');
    console.info();
});