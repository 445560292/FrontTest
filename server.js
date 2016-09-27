//test for http and url

var http = require("http");
var url = require("url");
var express = require('express');
var app = express();
app.use(express.static('static'));
var bodyParser = require('body-parser');
var fs = require("fs");



http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + "received");
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World\n')
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888');


// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}


// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");