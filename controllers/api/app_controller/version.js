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
            ossClient.put('test/' + req.file.originalname, req.file.buffer).then(function (result) {
                Base.returnData(res, result);
            });
        }

        //Base.returnData(res, { apkURL: "https://www.baidu.com" });
    },
    /**
     * 删除刚刚上传到的OSS的APK包
     */
    deleteAPK: function (req, res) {
        //ossClient.delete("")
        var checkParams = Base.checkParams_2(res.body);
        ossClient.delete("test/udianbus-fac-release-110-0324-1821.apk")
            .then(function (result) {
                Base.returnData(res, result);
            });
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