

var jwt = require('jsonwebtoken');



//这些请求需要 验证login_token
module.exports = {
    loginToken: function (req, res, next) {

        //跨域请求使用get.
        //console.log(req.query);
        var token = (req.body && req.body.login_token) || (req.query && req.query.login_token) || req.headers['x-login-token'];
        //console.log("token:", token);
        jwt.verify(token, 'allen', function (err, decoded) {
            if (err) {
                res.json({ code: 400, msg: "login_token 验证失败!", data: err });
            } else {
                next();
            }
        });
    }
}