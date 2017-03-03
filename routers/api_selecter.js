var express = require('express');
var router = express.Router();
var Api_selecter = require('../controllers/api_selecter');
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
    Api_selecter.index(req, res);
});

router.get('/daily', function (req, res) {
    Api_selecter.daily(req, res);
});

router.get('/weekly', function (req, res) {
    Api_selecter.weekly(req, res);
});

router.get('/cookie', function (req, res) {
    Api_selecter.cookie(req, res);
});


module.exports = router;