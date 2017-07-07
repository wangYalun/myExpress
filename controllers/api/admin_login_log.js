
var Base = require('./base');

var Model = require('../../models/admin_login_log');

var moment = require('moment');

module.exports = {
    getAllorOne: function (req, res) {
        if (req.params.id) {
            Model.getById(req.params.id).then(function (result) {
                Base.returnData(res, result);
            });
        } else {
            Model.getAll(req.params.id).then(function (result) {
                Base.returnData(res, result);
            });
        }
    },
    update: function (req, res) {

    },
    new: function (req, res) {
        var obj = {
            login_uid: req.body.login_uid,
            login_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            device_info: req.body.device_info
        };
        Model.new(obj).then(function (result) {

            Base.returnData(res, result);
        });
    },
    delete: function (req, res) {
        var id = req.params.id || "";

    }
}