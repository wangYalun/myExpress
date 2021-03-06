var express = require('express');


var router = express.Router();

var ApiSelecter = require('../../controllers/api_selecter');
var jwt = require('jsonwebtoken');


router.all('*', function (req, res, next) {

    //跨域请求使用get.
    var params = req.query || req.params;
    console.log(req.headers);
    jwt.verify(params.login_token, 'allen', function (err, decoded) {
        if (err) {
            res.json(err);
        } else {
            next();
        }
    });
});


router.get('/today', function (req, res) { ApiSelecter.today(req, res); });

module.exports = router;