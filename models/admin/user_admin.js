var db = require('../../utils/db');

var tool = require('../../utils/tool');

var redisClient = require('../../utils/redis');

// var md5 = require('md5');

var md5 = require('crypto').createHash('md5');


function login(username, password) {
    var promise = new Promise(function (resolve, reject) {
        //TODO 暂时先验证phone_num,知道验证规则后完善
        db.query("select phone_num as username from user_admin where phone_num=?", [username])
            .then(resolve);
    });
    return promise;
}

module.exports = {
    login: login,
    /**
     * 管理后台获取Token
     */
    adminLogin: function (phone_num, password) {
        return db.getWhere("user_admin", {
            phone_num: phone_num
        }).then(function (rows) {
            // console.log("",res);
            if (rows.length) {
                //能查到数据，则对比密码是否正确。
                var userInfo = rows[0];
                //console.log(userInfo);
                md5.update(userInfo['password_salt'] + password);

                //if (md5.digest(userInfo['password_salt'] + password) === userInfo['password_hash']) {
                var token = tool.createNonceStr();

                redisClient.command("set " + token + " " + userInfo['id']);
                return { token: token }
                //}
            }
            return {};
        });
    }
}