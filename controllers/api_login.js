var admin = require('../models/admin');
var apibase = require('./api_base');


var apiLogin = Object.create(apibase);

apiLogin.login = function (req, res) {
    var it = this;
    var paramsObj = it.checkParam(req);
    if (!paramsObj.isTrue) {
        res.send(paramsObj.errorMsg);
        return;
    }
    var params=paramsObj.params;
    admin.login(params.email, params.password).then(function (result) {

        it.returnData(res,result[0]);
    });
}


module.exports = apiLogin;