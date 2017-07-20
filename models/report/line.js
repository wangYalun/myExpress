var db = require('../../utils/db');


var _ = require('underscore');

module.exports = {
    getLine: function (filterObj) {

        var sql = db.DB.queryFormat("select * from line_statistic_daily where date>=? and date<=?", [filterObj.start_date, filterObj.end_date]);
        if (filterObj.query_name) {
            sql = db.DB.queryFormat(sql + " and (line_no like ? or line_name like ?)", ['%' + filterObj.query_name + '%', '%' + filterObj.query_name + '%']);
        }

        var promise = new Promise(function (resolve, reject) {
            db.query(sql).then(function (result) {

                var lineObj = {};
                var date_list = [];
                result.forEach(function (item, index, arr) {
                    date_list.push(item.date);
                    if (lineObj[item.line_id]) {
                        //if (!lineObj[item.line_id][item.date]) {
                        lineObj[item.line_id][item.date] = item.people_num;
                        lineObj[item.line_id]['all_people_num'] += item.people_num;
                        lineObj[item.line_id]['all_service_num'] += item.service_num;
                        lineObj[item.line_id]['all_money'] += item.people_num * item.ticket_price;
                        lineObj[item.line_id]['all_seat_num'] += item.seat_num;
                        //}
                    } else {
                        lineObj[item.line_id] = item;
                        lineObj[item.line_id][item.date] = item.people_num;
                        lineObj[item.line_id]['all_people_num'] = item.people_num;
                        lineObj[item.line_id]['all_service_num'] = item.service_num;
                        lineObj[item.line_id]['all_money'] = item.people_num * item.ticket_price;
                        lineObj[item.line_id]['all_seat_num'] = item.seat_num;

                        //lineObj[item.line_id].date_list.push(item);
                    }
                });
                resolve({
                    lineDateList: _.map(lineObj, function (value, index) {
                        if (typeof value !== 'object') {
                            return;
                        }
                        value['average_people_num'] = Math.round(value['all_people_num'] / value['all_service_num'] * 100) / 100;
                        value['average_occupancy_rate'] = Math.round(value['all_people_num'] / value['all_seat_num'] * 100) / 100;
                        return value;
                    }),
                    dateList: _.uniq(date_list).sort()
                });
            });
        });
        return promise;
    },
    getMonthly: function (filterObj) {
        var sql = "select line_id,line_no,org_id,org_name,bus_no,line_name,sum(service_num) as service_num,ticket_price,"
            + "sum(people_num) as people_num,sum(people_num*ticket_price) as money,"
            + "sum(refund_num) as refund_num from line_statistic_daily "
            + "where date>=? and date<? "
            + "group by line_no order by org_id,line_no";
        sql = db.DB.queryFormat(sql, [filterObj.start_date, filterObj.end_date]);

        return db.query(sql);
    }
}