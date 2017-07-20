
var Base = require('../base');


var Model = require('../../../models/line/notice');

var _ = require('underscore');

var moment = require('moment');

var uuid = require('uuid/v1');


module.exports = {
    updateNotice: function (req, res) {
        var id = req.params.id;

        var checkParams = Base.checkParams_2(req.body, {
            isRequired: ['content', 'is_available'],
            isNumber: ['is_available']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        checkParams.params.modify_date = moment().format("YYYY-MM-DD HH:mm:ss");
        Model.updateNotice(checkParams.params, id).then(function (result) {
            console.log(result);
            if (result.affectedRows >= 1) {
                Base.returnData(res, {}, 200, '更新成功');
            } else {
                Base.returnData(res, {}, 400, '更新失败');
            }
            //Base.returnData(res, result);
        });
    },
    getNotice: function (req, res) {
        Model.getNotice({}, req.query.size || 10, req.query.index).then(function (result) {

            Base.returnData(res, result);
        });
    },
    addNotice: function (req, res) {
        var now = moment().format('YYYY-MM-DD HH:mm:ss');
        var checkParams = Base.checkParams_2(req.body, {
            isRequired: ['content', 'is_available'],
            isNumber: ['is_available']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        checkParams.params.id = uuid();
        checkParams.params.create_date = now;
        checkParams.params.modify_date = now;
        Model.addNotice(checkParams.params).then(function (result) {
            if (result.affectedRows >= 1) {
                Base.returnData(res, { id: result.insertId });
            } else {
                Base.returnData(res, {}, 400, '插入数据失败');
            }
            //Base.returnData(res, result);
        });
    }
}