
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
            Base.returnData(res, result);
        });
    },
    getNotice: function (req, res) {
        Model.getNotice({}, req.query.size || 10, req.query.index).then(function (result) {
            Base.returnData(res, result);
        });
    }
}