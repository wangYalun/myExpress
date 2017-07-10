
var Base = require('./base');

var Model = require('../../models/admin_login_log');

var moment = require('moment');
var _ = require('underscore');

var ModelFileds = ['device_info', 'login_uid', 'login_time', 'id'];


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
        var id = req.params.id || "";

        if (typeof req.body === 'object') {
            var obj = _.pick(req.body, ModelFileds);
            // Base.returnData(res, obj);
            Model.updateById(obj, id).then(function (result) {
                Base.returnData(res, result);
            });
        }
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
        console.log(id);
        Model.deleteById(id).then(function (result) {
            Base.returnData(res, result);
        });
    },
    search: function (req, res) {

        var filterObj = _.pick(req.query, ModelFileds);
        // console.log('asdfa', filterObj);
        if (filterObj.login_time) {
            filterObj.login_time = {
                value: filterObj.login_time,
                isLike: true
            }
        }
        Model.search(filterObj, req.query.limit, req.query.offset).then(function (result) {
            Base.returnData(res, result);
        });
    }
}