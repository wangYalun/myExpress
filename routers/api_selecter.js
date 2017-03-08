var express = require('express');
var router = express.Router();
var ApiSelecter = require('../controllers/api_selecter');
var jwt = require('jsonwebtoken');


router.all('*', function (req, res, next) {

    //跨域请求使用get.
    var params = req.query || req.params;
    jwt.verify(params.login_token, 'allen', function (err, decoded) {
        if (err) {
            res.json(err);
        } else {
            next();
        }
    });
});

router.get('/', function (req, res) {
    ApiSelecter.index(req, res);
});

router.get('/today',function(req,res){
    ApiSelecter.today(req,res);
});

router.get('/daily', function (req, res) {
    ApiSelecter.daily(req, res);
});

router.get('/weekly', function (req, res) {
    ApiSelecter.weekly(req, res);
});

router.get('/cookie', function (req, res) {
    ApiSelecter.cookie(req, res);
});


module.exports = router;