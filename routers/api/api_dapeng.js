/**
 * 测试用接口
 */

var express = require('express');

var fs = require('fs');

var router = express.Router();

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



module.exports = router;