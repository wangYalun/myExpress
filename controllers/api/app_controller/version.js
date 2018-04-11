var Base = require('../base');

var ossClient = require('../../../lib/oss');

var Model = require("../../../models/app_controller/version");



module.exports = {
    getVersion: function (req, res) {
        Model.getVersion({}, req.query.size || 10, req.query.index).then(function (result) {
            Base.returnData(res, result);
        });
    },
    uploadAPK: function (req, res) {
        ossClient.put('test/' + req.file.originalname, req.file.buffer).then(function (result) {
            Base.returnData(res, result);
        });
    },
    addVersion: function (req, res) {
        
    }
}