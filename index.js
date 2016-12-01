var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
 // for parsing multipart/form-data
app.use(cookieParser());

app.use(express.static('public'));


app.get('/', function (req, res) {
   
    //res.send('Hello World');
    console.log(req.query);
    console.log(req.params);
    res.json(req.query||req.params);

});

//加载相关控制器路由
var routers = fs.readdirSync('./routers');
for(var index in routers){
    var file = routers[index];
    var name = file.replace('.js','');
    app.use('/'+name,require('./routers/'+name));
}

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});