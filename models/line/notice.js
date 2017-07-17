var db = require('../../utils/db');

module.exports = {
    getNotice: function (filterObj, limit, offset) {

        var promise = new Promise(function (resolve, reject) {
            db.count('system_msg', filterObj).then(function (result) {
                var size = result[0] && result[0].size;
                db.getWhere('system_msg', filterObj, limit, offset).then(function (result) {
                    var obj = {};
                    obj.size = size;
                    obj.rows = result;
                    resolve(obj);
                })
            })
        });

        return promise;
    },
    updateNotice: function (data, id) {
        console.log("updateNotice");
        if (data.is_available == "1") {
            db.update('system_msg', { is_available: 0 });
        }
        return db.update('system_msg', data, { id: id });
    }
}