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
    }

}