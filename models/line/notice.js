var db = require('../../utils/db');

module.exports = {
    _getNotice: function (filterObj, limit, offset) {

        var promise = new Promise(function (resolve, reject) {
            db.count('system_msg', filterObj).then(function (result) {
                var size = result[0] && result[0].size;
                db.getWhere('system_msg', filterObj, limit, offset, { is_available: 'desc', modify_date: 'desc' }).then(function (result) {
                    var obj = {};
                    obj.size = size;
                    obj.rows = result;
                    resolve(obj);
                })
            })
        });

        return promise;
    },
    //利用Promise.all 改进双层promise 嵌套
    getNotice: function (filterObj, limit, offset) {
        return Promise.all([db.count('system_msg', filterObj), db.getWhere('system_msg', filterObj, limit, offset, { is_available: 'desc', modify_date: 'desc' })])
            .then(resArray => {
                var sizeResult = resArray[0];
                var result = resArray[1];
                return {
                    size: (sizeResult[0] && sizeResult[0].size) || 0,
                    rows: result
                };
            });
    },
    updateNotice: function (data, id) {
        console.log("updateNotice");
        if (data.is_available == "1") {
            db.update('system_msg', { is_available: 0 });
        }
        return db.update('system_msg', data, { id: id });
    },
    addNotice: function (data) {
        //如果当前通知生效，其他的通知改为失效状态
        if (data.is_available == '1') {
            db.update('system_msg', { is_available: 0 });
        }
        return db.insert('system_msg', data);
    }
}