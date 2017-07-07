
var Base = require('./base');




module.exports = {
    today: function (req, res) {

        var data = {
            requestData: res.body,
            result: [{ title: "浏览量（PV）", num: 10000, rate: -89.01 },
            { title: "浏览量（PV）", num: 10000, rate: -89.01 },
            { title: "浏览量（PV）", num: 10000, rate: -89.01 },
            { title: "浏览量（PV）", num: 10000, rate: -89.01 },
            { title: "浏览量（PV）", num: 10000, rate: -89.01 }]
        };
        Base.returnData(res, data);
    }
}