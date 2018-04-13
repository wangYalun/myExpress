var Base = require('../base');

var ossClient = require('../../../lib/oss');

var Model = require("../../../models/app_controller/version");

var logger = require('../../../log').logger();

module.exports = {
    getVersion: function (req, res) {
        Model.getVersion({}, req.query.size || 10, req.query.index).then(function (result) {
            Base.returnData(res, result);
        });
    },
    uploadAPK: function (req, res) {
        // Base.returnData(req.file)
        logger.debug(req.file);
        if (!/android/.test(req.file.mimetype)) {
            Base.returnData(res, {}, 415, "请上传APK文件");
        } else {
            // ossClient.put('test/' + req.file.originalname, req.file.buffer).then(function (result) {
            //     Base.returnData(res, result);
            // });
        }

        Base.returnData(res);
    },
    addVersion: function (req, res) {
        var checkParams = Base.checkParams_2(req.body);

        logger.debug(checkParams);
        Model.addVersion(checkParams.params).then(function (result) {
            if (result.affectedRows >= 1) {
                Base.returnData(res, { id: result.insertId });
            } else {
                Base.returnData(res, {}, 400, '插入数据失败');
            }
        })
    }
}