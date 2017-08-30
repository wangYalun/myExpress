
var Base = require('../base');


var Model = require('../../../models/line/commute');

var _ = require('underscore');

var moment = require('moment');

var uuid = require('uuid/v1');



module.exports = {
    getCommute: function (req, res) {

        var params = {
            index: req.query.index,
            size: req.query.size,
            query_name: req.query.query_name,
            status: req.query.line_status,
            line_mode: req.query.line_model
        };



        var filterObj = Base.checkFilterObj(params, ['query_name', 'status', 'line_mode']);

        //console.log(filterObj);

        if (filterObj['query_name']) {
            filterObj['query_name'] = {
                value: filterObj['query_name'],
                fileds: ['line_desc', 'line_name', 'line_no']
            }
        }
        Model.getCommute(filterObj, req.query.size || 10, req.query.index).then(function (result) {
            Base.returnData(res, result);
        })
    },
    getCommuteById: function (req, res) {
        var id = req.params.id;
        Model.getCommuteById(id).then(function (result) {
            Base.returnData(res, result[0] || {});
        })
    },
    /**
     * 增加线路
     * @method post
     * @param 
     */
    addCommute: function (req, res) {
        var create_time = moment().format("YYYY-MM-DD HH:mm:ss");


        var checkParams = Base.checkParams_2(req.body, {
            isNonEmpty: ['arrive_time', 'start_time', 'line_no', 'line_name', 'once_price',
                'line_mode', 'org_id', 'line_type', 'check_ticket_type', 'default_inventory', 'is_section_price'],
            isNumber: ['default_inventory', 'once_price', 'mileage']
        });

        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        var params = checkParams.params;

        Model.addCommute({
            id: uuid(),
            create_date: create_time,
            create_user_id: params.uid || "",
            modify_date: create_time,
            modify_user_id: req.body.uid || "",
            arrive_time: params.arrive_time,
            // begin_date: req.body.begin_date,
            // end_date: req.body.end_date,
            // end_station_id:,
            // end_station_name,
            line_desc: params.line_desc,
            line_name: params.line_name,
            line_no: params.line_no,
            mileage: params.mileage || 0,
            monthly_price: params.montyly_price || 0,
            once_price: params.once_price,
            // start_station_id,
            // start_station_name,
            start_time: params.start_time,
            status: params.status || 'editing',
            line_mode: params.line_mode,
            org_id: params.org_id,
            // direction,
            // school_id,
            line_type: params.line_type,
            check_ticket_type: params.check_ticket_type,
            default_inventory: params.default_inventory,
            generate_type: params.generate_type,
            // service_end_time,
            // service_start_time,
            is_section_price: params.is_section_price,
            // line_label,
            // line_label_color
        }).then(function (result) {
            if (result.affecteRows >= 1) {
                Base.returnData(res, { id: result.insertId });
            } else {
                Base.returnData(res, {}, 400, '插入数据失败');
            }
        });

    },
    /**
     * 修改线路信息
     * @method PUT
     * @param 
     */
    updateCommute: function (req, res) {
        var id = req.params.id;

        var checkParams = Base.checkParams_2(req.body, {
            isNonEmpty: ['arrive_time', 'start_time', 'line_no', 'line_name', 'once_price',
                'line_mode', 'org_id', 'line_type', 'check_ticket_type', 'default_inventory', 'is_section_price'],
            isNumber: ['default_inventory', 'once_price', 'mileage']
        });

        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }

        Model.updateCommute(checkParams.params, id).then(function (result) {
            Base.returnData(res, result);
        });
    }
}