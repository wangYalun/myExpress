

var jwt = require('jsonwebtoken');



//这些请求需要 验证login_token
module.exports = {
    loginToken: function (req, res, next) {

        //跨域请求使用get.
        var token = (req.body && req.body.login_token) || (req.query && req.query.login_token) || req.headers['x-login-token'];
        jwt.verify(token, 'allen', function (err, decoded) {
            if (err) {
                res.json(err);
            } else {
                next();
            }
        });
    }
}