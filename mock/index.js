const express = require('express'); //引入express模块
const bodyParser = require('body-parser');
const modules = require('./modules');

let app = express(); //实例化express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//跨域访问，允许接受跨域请求
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
})

/**
 * 配置路由
 * @param  {[type]} req  [客户端发过来的请求所带数据]
 * @param  {[type]} res  [服务端的相应对象，可使用res.send返回数据，res.json返回json数据，res.down返回下载文件]
 */

// 为每个具体的配置创建监听
for (let i = 0; i < modules.length; i++) {
	let item = modules[i];
	app[item.method](item.router, item.data);
}

/**
 * 监听8080端口
 **/

let server = app.listen('8080', () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log('监听 http://%s:%s', host, port);
})

