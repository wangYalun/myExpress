var Base = require('../base');


var Model = require('../../../models/report/line');

var _ = require('underscore');

var moment = require('moment');

var uuid = require('uuid/v1');


module.exports = {
    getLine: function (req, res) {
        // var params={
        //     start_date:req.query.start_date,
        //     end_date:req.query.end_date,
        //     line_no:req.query.line_no,
        // }

        var checkParams = Base.checkParams_2(req.query, {
            isNonEmpty: ['start_date', 'end_date', 'line_no'],
            isRequired: ['start_date', 'end_date']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        Model.getLine(checkParams.params).then(function (result) {
            Base.returnData(res, result);
        });
    }
}