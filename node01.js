/*
*node 没有根目录的概念 没有任何web容器  
*node.js擅长做顶层 路由设计
 */

//require 表示引包； 引包是就是就是表示 引用自己的一个特殊功能
var http = require("http");
var fs = require("fs");
var fs = require("fs");/*fs 是用来 读文件的*/
//创建服务器 ，参数是一个回调函数，表示如果有请求进来， 要做什么
var server = http.createServer(function(req,res){
	//req 表示 请求=request  res 表示响应 response
	/*回调函数中书写这些*/
	if(req.url == "/fang")
	{
		fs.readFile("./test.html",function(err,data){
		//设置HTTP 头部，状态码是200，文件类型是html.字符集是utf-8
		res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
		res.end(data);
		});
	}
	else if(req.url == "/yuan")
	{
		fs.readFile("./yuan.html",function(err,data){
		//设置HTTP 头部，状态码是200，文件类型是html.字符集是utf-8
		res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
		res.end(data);
		});
	}
	/*当引入图片 以后*/
	else if(req.url == "/0.png")
	{
		fs.readFile("./0.png",function(err,data){
		//设置HTTP 头部，状态码是200，文件类型是html.字符集是utf-8
		res.writeHead(200,{"Content-type":"image/png"});
		res.end(data);
		});
	}
	else if(req.url == "/bbbbb.css")
	{
		fs.readFile("./aaaaa.css",function(err,data){
		//设置HTTP 头部，状态码是200，文件类型是html.字符集是utf-8
		res.writeHead(200,{"Content-type":"text/css"});
		res.end(data);
		});
	}
	else
	{
		res.writeHead(404,{"Content-type":"text/html;charset=utf-8"});
		res.end("嘻嘻没有这个页面呦");
	}
});



//运行服务服务器
//node 根本没有 任何web容器
server.listen(3000,"127.0.0.1");
