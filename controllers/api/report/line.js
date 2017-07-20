var Base = require('../base');


var Model = require('../../../models/report/line');

var _ = require('underscore');

var moment = require('moment');

var uuid = require('uuid/v1');

var fs = require('fs');

var iconv = require('iconv-lite');


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
    },
    getLineCSV: function (req, res) {
        var checkParams = Base.checkParams_2(req.query, {
            isNonEmpty: ['start_date', 'end_date', 'line_no'],
            isRequired: ['start_date', 'end_date']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        Model.getLine(checkParams.params).then(function (result) {
            var columns = [
                { title: '线路编号', dataIndex: 'line_no', key: 'line_no' },
                { title: '发车时间', dataIndex: 'start_time', key: 'start_time' },
                { title: '线路名称', dataIndex: 'line_name', key: 'line_name' },
                { title: '里程', dataIndex: 'mileage', key: 'mileage' },
                { title: '票价', dataIndex: 'ticket_price', key: 'ticket_price' },
                { title: '座位数', dataIndex: 'seat_num', key: 'seat_num' }
            ];

            result.dateList.forEach(function (item, index) {
                columns.push({ title: item, dataIndex: item, key: item, render: text => text || '--' });
            });
            columns = columns.concat([
                { title: '平均售票数', dataIndex: 'average_people_num', key: 'average_people_num' },
                { title: '平均上座率', dataIndex: 'average_occupancy_rate', key: 'average_occupancy_rate', render: text => Math.floor(text * 100) + "%" },
                { title: '班次总票数', dataIndex: 'all_people_num', key: 'all_people_num' },
                { title: '班次总金额', dataIndex: 'all_money', key: 'all_money' },
                { title: '总班次', dataIndex: 'all_service_num', key: 'all_service_num' },
            ]);
            var header = [];
            columns.forEach(function (item, index) {
                header.push(item.title);
            });
            var body = [header];
            result.lineDateList.forEach(function (v, k) {
                var tr = [];
                columns.forEach(function (item) {
                    tr.push(v[item.dataIndex]);
                });
                body.push(tr);
            });
            var bodyStrArr = body.map(function (item) {
                return item.join(',');
            });
            var uuidInstance = uuid();
            fs.appendFile('./public/' + uuidInstance + '.csv', iconv.encode(bodyStrArr.join("\n"), 'GBK'), 'utf8', function () {
                res.download('./public/' + uuidInstance + '.csv', 'report' + result.dateList[0] + '~' + result.dateList[1] + '.csv', function (err) {
                    if (err) {

                    }
                    fs.unlink('./public/' + uuidInstance + '.csv', function (err) {
                        if (err) throw err;
                        console.log('删除成功 ,' + uuidInstance + '.csv');
                    })

                });

            });
            //Base.returnData(res, result);
        });
    },
    getMonthly: function (req, res) {
        var checkParams = Base.checkParams_2(req.query, {
            isNonEmpty: ['start_date', 'end_date'],
            isRequired: ['start_date', 'end_date']
        });
        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        Model.getMonthly(checkParams.params).then(function (result) {
            Base.returnData(res, result);
        });
    }
}