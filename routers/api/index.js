
var express = require('express');

var router = express.Router();

var selecter = require('../../controllers/api/selecter');
var login = require('../../controllers/api/login');

var admin_login_log = require('../../controllers/api/admin_login_log');


var jwt = require('jsonwebtoken');

var auth = require('./auth');

//这些请求需要 验证login_token
// router.all('*', function (req, res, next) {

//     //跨域请求使用get.
//     var token = (req.body && req.body.login_token) || (req.query && req.query.login_token) || req.headers['x-login-token'];
//     jwt.verify(token, 'allen', function (err, decoded) {
//         if (err) {
//             res.json(err);
//         } else {
//             next();
//         }
//     });
// });



router.post('/login', function (req, res) {
    login.check(req, res);
});

router.get('/selecter/today', auth.loginToken, selecter.today);


router
    .get('/admin_login_log', auth.loginToken, admin_login_log.getAllorOne)
    .get('/admin_login_log/search', auth.loginToken, admin_login_log.search)
    .get('/admin_login_log/:id', auth.loginToken, admin_login_log.getAllorOne)
    .post('/admin_login_log', auth.loginToken, admin_login_log.new)
    .put('/admin_login_log/:id', auth.loginToken, admin_login_log.update)
    .delete('/admin_login_log/:id', auth.loginToken, admin_login_log.delete);
;


router.get('/test', function (req, res) {

    res.cookie("name", "allen");
    res.json(req.headers);
});

router.get('/download', function (req, res) {
    //实现下载文件功能
    res.download('./index.js');
});



module.exports = router;
