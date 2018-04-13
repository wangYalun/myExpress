var db = require("../../utils/db");

var BaseModel = require('../BaseModel');



module.exports = {
    getVersion: function (filterObj, limit, offset) {
        return Promise.all([db.count('version', filterObj), db.getWhere('version', filterObj, limit, offset)])
            .then(function (resArray) {
                var sizeResult = resArray[0];
                var result = resArray[1];
                return {
                    size: (sizeResult[0] && sizeResult[0].size) || 0,
                    rows: result
                };
            })
    },
    addVersion: function (data) {
        data.id = BaseModel.createUUID();
        data.create_date = BaseModel.getNow();
        data.modify_date = BaseModel.getNow();
        return db.insert('version', data);
    }
}