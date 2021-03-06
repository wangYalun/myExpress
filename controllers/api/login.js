var admin = require('../../models/admin');
var Base = require('./base');
var jwt = require('jsonwebtoken');

module.exports = {
    /**
     * 用户登录,获取login_token
     * @method POST
     * @param {Object} 请求参数email,password
     */
    check: function (req, res) {


        var checkParams = Base.checkParams_2(req.body, {
            isRequired: ['email', 'password']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        var params = checkParams.params;

        admin.login(params.email, params.password).then(function (result) {
            if (result.length === 0) {
                Base.returnData(res, {}, 403,
                    "用户名或密码错误");
            } else if (result[0].flag !== 'Y') {
                Base.returnData(res, {}, 403, "该用户已被禁用");
            } else {
                result[0].login_token
                    = jwt.sign({ uid: result[0].uid, iat: Math.floor(Date.now() / 1000) - 30 }, 'allen');
                Base.returnData(res, result[0]);
            }
        });
    }
}

