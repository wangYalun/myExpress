
var express = require('express');

var router = express.Router();

var selecter = require('../../controllers/api/selecter');
var apiLogin = require('../../controllers/api_login');


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
    apiLogin.login(req, res);
});

router.get('/selecter/today', auth.loginToken, selecter.today);

module.exports = router;
