/**
 * Created by king on 15-6-25.
 *
 * ch14.mysql_insert.js
 */
console.info("------   mysql insert()   ------");
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
    /**
     * 数据库插入 INSERT 操作
     */
    connection.query('insert into userinfo(id,name,pwd) values(7,"guest","12345678");', function (errorinsert, resinsert) {
        if (errorinsert) console.log(errorinsert);
        console.log("INSERT Return ==> ");
        console.log(resinsert);
        /**
         * 数据库查询 SELECT 操作
         */
        connection.query('select * from userinfo;', function (errorselect, rows, fields) {
            res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
            res.write("<h3>测试 Node.js - MySQL 数据库插入操作!</h3><br/>");
            res.end(JSON.stringify(rows));
        });
    });
}).listen(6868);    // TODO: 监听6868端口号