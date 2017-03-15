var express = require('express');
//var jwt = require('jsonwebtoken');

var router = express.Router();

var fs = require('fs');




// router.all('*', function (req, res, next) {
//     console.log(req.query || req.params);

//     var login_token = req.headers['login_token'];

//     jwt.verify(login_token, 'allen', function (err, decoded) {
//         if (err) {
//             res.json(err);
//         } else {
//             next();
//         }
//     });
// });

//post 传参测试
router.post('/', function (req, res) {

    //Api_selecter.index(req,res);
    console.log(req.query);
    console.log(req.params);
    res.json('api_receiver');
});

//只能接收 x-www-form-urlencoded 传参方式
router.post('/access_app', function (req, res) {

    //Api_selecter.index(req,res);
    console.log(req.route.methods);
    res.json(req.headers);
    return;
    console.log('ni shi yige ');
    //res.sendStatus(403);
});
router.get('/access_app', function (req, res) {
    console.log(req.route.methods);
    res.json(req.query || req.params);
});


router.get('/client_info', function (req, res) {
    var params=req.query||req.params;
    fs.writeFile('logs/client_info.log',JSON.stringify(params)+"\n",{flag:'a'},function(err){
        if(err){
            return console.error(err);
        }
        console.log('接收到客户端浏览器数据：'+JSON.stringify(params));
    });
    res.json('');
});


module.exports = router;