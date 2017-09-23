/**
 * Created by king on 15-6-25.
 *
 * ch14.mysql_query.js
 */
console.info("------   mysql query()   ------");
console.info();
var http = require("http"); // TODO: 引入HTTP模块
var mysql = require('/usr/local/lib/node_modules/mysql');   // TODO: 引入mysql模块
console.log("Now start HTTP server on port 6868...");
console.info();
/**
 * 创建数据库连接
 */
var connection = mysql.createConnection({
    host: "localhost",  // TODO: 主机地址
    user: "root",       // TODO: 数据库用户名
    password: "root",   // TODO: 数据库密码
    database: "nodejs", // TODO: 数据库名称
    port: 3306          // TODO: 端口号
});
/**
 * 创建HTTP服务器
 */
http.createServer(function (req, res) {
    connection.query('select * from userinfo;', function (error, rows, fields) {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        res.write("<h3>测试 Node.js - MySQL 数据库查询操作!</h3><br/>");
        res.end(JSON.stringify(rows));
    });
}).listen(6868);    // TODO: 监听6868端口号