var db=require('../utils/db');

module.exports = {
    daily: function (name) {
        var promise = new Promise(function (resolve, reject) {
            //模拟数据库查询异步任务
            //setTimeout(resolve, 4000, name + 'done');
            db.test.query('show tables').then(resolve);
        });
        return promise;
    }
};