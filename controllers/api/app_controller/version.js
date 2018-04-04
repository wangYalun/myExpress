var Base = require('../base');


var Model = require("../../../models/app_controller/version");

module.exports = {
    getVersion: function (req, res) {
        Model.getVersion({}, req.query.size || 10, req.query.index).then(function (result) {
            Base.returnData(res, result);
        });
    },
    uploadAPK: function (req, res) {

    },
    addVersion:function(req,res){

    }
}