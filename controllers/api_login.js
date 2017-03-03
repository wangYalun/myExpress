var admin = require('../models/admin');
var apibase = require('./api_base');
var jwt = require('jsonwebtoken');


var apiLogin = Object.create(apibase);

apiLogin.login = function (req, res) {
    var it = this;
    var paramsObj = it.checkParam(req);
    if (!paramsObj.isTrue) {
        res.send(paramsObj.errorMsg);
        return;
    }
    var params = paramsObj.params;
    admin.login(params.email, params.password).then(function (result) {
        if (result.length === 0) {
            it.returnData(res, {}, 403, "用户名或密码错误");
        } else if (result[0].flag !== 'Y') {
            it.returnData(res, {}, 403, "该用户已被禁用");
        } else {
            result[0].login_token = jwt.sign({ uid: result[0].uid, iat: Math.floor(Date.now() / 1000) - 30 }, 'allen');
            it.returnData(res, result[0]);
        }

    });
};

apiLogin.register = function (req, res) {
    var it = this;
    var paramsObj = it.checkParam(req);

    admin.register(paramsObj.params).then(function (result) {

    });
};



module.exports = apiLogin;