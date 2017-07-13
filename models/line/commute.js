
var db = require('../../utils/db');

var _ = require('underscore');


module.exports = {
    getCommute: function (filterObj, limit, offset) {
        var promise = new Promise(function (resolve, reject) {

            db.count('line', filterObj).then(function (result) {

                var size = result[0] && result[0].size;

                db.getWhere('line', filterObj, limit, offset).then(function (result) {
                    var obj = {};
                    obj.size = size;
                    obj.rows = result;
                    resolve(obj);
                });
            });
        });

        return promise;
    },
    getCommuteById: function (id) {
        return db.getWhere('line', { id: id });
    },
    addCommute: function (data) {
        return db.insert('line', data);
    },
    updateCommute: function (data, id) {
        return db.update('line', data, { id: id });
    }
}