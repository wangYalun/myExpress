var admin = require('../../models/admin/user_admin');
var Base = require('./base');
var jwt = require('jsonwebtoken');


var logger = require('../../log').logger();




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
                    = jwt.sign({ uid: result[0].username, iat: Math.floor(Date.now() / 1000) - 30 }, 'allen', { expiresIn: 60 * 60 * 24 });//设置token 24h后过期
                Base.returnData(res, result[0]);
            }
        });
    },
    /**
     * 小程序登录验证
     */
    xcxLogin: function (req, res) {

        var checkParams = Base.checkParams_2(req.body, {
            isRequired: ['code']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
        }
        var params = checkParams.params;

        var result = {
            token: jwt.sign({ code: params.code }, 'allen', { expiresIn: 60 * 60 * 24 })
        }
        Base.returnData(res, result);
    },
    /**
     * 优点巴士管理后台获取请求Token
     */
    getAdminToken: function (req, res) {
        var checkParams = Base.checkParams_2(req.body, {
            isRequired: ['phone_num', 'password_hash']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        var params = checkParams.params;
        admin.adminLogin(params.phone_num, params.password_hash).then(function (result) {
            if (result.token) {

                Base.returnData(res, result.token)
            } else {
                Base.returnData(res, {}, 401);
            }
        })

    }
}

