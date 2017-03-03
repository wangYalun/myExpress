var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.locals.address = "localhost";
app.locals.port = "8081";
app.locals.email = "326402399@qq.com";
//app.locals.strftime=require("strftime");

var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//不能这样使用multer ,详细参考 https://segmentfault.com/q/1010000003050818
//app.use(multer({ dest: './uploads/' }));// for parsing multipart/form-data
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/user')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
var cpUpload = upload.any();
app.use(cpUpload);

app.use(cookieParser());

app.use(express.static('public'));


// app.get('/', function (req, res) {

//     //res.send('Hello World');
//     console.log(req.query);
//     console.log(req.params);
//     res.json(req.query || req.params);

// });
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



//加载相关控制器路由
var routers = fs.readdirSync('./routers');
for (var index in routers) {
    var file = routers[index];
    var name = file.replace('.js', '');
    app.use('/' + name, require('./routers/' + name));
}

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});