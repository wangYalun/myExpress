
/**
 * 接口拦截层
 */



var jwt = require('jsonwebtoken');


var db = require('../../utils/db');

var logger = require('../../log').logger();

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
    },
    /**
     * 验证管理后台请求Token
     */
    checkAdminToken: function (req, res, next) {
        var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['token'];
        var phoneNum = (req.body && req.body.phone_num) || (req.query && req.query.phone_num) || req.headers['phone_num'];

        db.getWhere("user_admin", { token: token }).then(function (result) {
            // logger.debug(result);
            if (result.length > 0) {
                next();
            } else {
                res.json({ code: 400, msg: "token验证失败！" });
            }
        });

    }
}