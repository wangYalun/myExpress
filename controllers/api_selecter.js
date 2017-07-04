var selecter = require('../models/selecter');

var apibase = require('./api_base');


var apiSelecter = Object.create(apibase);


apiSelecter.today = function (req, res) {
    var it = this;
    var paramsObj = it.checkParam(req);
    if (!paramsObj.isTrue) {
        res.send(paramsObj.errorMsg);
        return; 
    }
    var params = paramsObj.params;

    it.returnData(res, [{ title: "浏览量（PV）", num: 10000, rate: -89.01 }, 
    { title: "浏览量（PV）", num: 10000, rate: -89.01 }, 
    { title: "浏览量（PV）", num: 10000, rate: -89.01 },
    { title: "浏览量（PV）", num: 10000, rate: -89.01 },
    { title: "浏览量（PV）", num: 10000, rate: -89.01 }]);
};

module.exports = apiSelecter;