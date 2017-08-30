var admin = require('../../models/admin/user_admin');
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
            isRequired: ['username', 'password']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        var params = checkParams.params;

        admin.login(params.username, params.password).then(function (result) {
            if (result.length === 0) {
                Base.returnData(res, {}, 403,
                    "用户名或密码错误");
            } else {
                result[0].login_token
                    = jwt.sign({ uid: result[0].phone_num, iat: Math.floor(Date.now() / 1000) - 30 }, 'allen');
                Base.returnData(res, result[0]);
            }
        });
    }
}

