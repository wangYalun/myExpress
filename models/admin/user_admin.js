var db = require('../../utils/db');

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
            phone_num: phone_num,
            password_hash: password
        })
    }
}