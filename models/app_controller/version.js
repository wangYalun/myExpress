var db = require("../../utils/db");

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
    }
}