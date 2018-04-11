var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var multer = require('multer');

var getLogger = require('./log.js').logger;



app.locals.address = "localhost";
app.locals.port = "8081";
app.locals.email = "326402399@qq.com";
//app.locals.strftime=require("strftime");



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//不能这样使用multer ,详细参考 https://segmentfault.com/q/1010000003050818
//app.use(multer({ dest: './uploads/' }));// for parsing multipart/form-data


//加入访问日志，详细参考：https://log4js-node.github.io/log4js-node/connect-logger.html
app.use(require('log4js').connectLogger(getLogger("access"), { level: "auto" }));


app.use(cookieParser());

app.use(express.static('public'));


// app.get('/', function (req, res) {

//     res.send('Hello ,NodeJS JSON API');

// });
app.all('*', function (req, res, next) {
    console.log(new Date());
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



//加载API相关控制器路由
// var routersAPI = fs.readdirSync('./routers/api');
// for (var index in routersAPI) {
//     var file = routersAPI[index];
//     var name = file.replace('.js', '');
//     app.use('/api/' + name, require('./routers/api/' + name));
// }
var API = require('./routers/api/index');

var APILogin = require('./routers/api/login');

var DapengAPI = require('./routers/api/api_dapeng');

var APITest = require('./routers/api_test.js');

var v1 = require('./routers/v1/index');


app.use('/api', APILogin);

app.use('/api', API);

app.use('/api/dapeng', DapengAPI);

app.use('/api_test', APITest);

app.use('/v1', v1);



var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

});




