var db = require('../utils/db');


module.exports = {
    new: function (data) {
        return db.insert('admin_login_log', data);
    },
    deleteById: function (id) {
        return db.delete('admin_login_log', { id: id });
    },
    getById: function (id) {

        return db.getWhere('admin_login_log', { id: id });
    },
    getAll: function () {
        return db.get('admin_login_log');
    },
    updateById: function (data, id) {
        return db.update('admin_login_log', data, { id: id });
    },
    search: function (filterObj, limit, offset) {

        var promise = new Promise(function (resolve, reject) {
            db.count('admin_login_log', filterObj).then(function (result) {

                var size = result[0] && result[0].size;

                db.getWhere('admin_login_log', filterObj, limit, offset).then(function (result) {
                    var obj = {};
                    obj.size = size;
                    obj.rows = result;
                    resolve(obj);
                });
            });
        });

        return promise;
    }

}