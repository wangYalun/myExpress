
var moment = require('moment');

var uuid = require('uuid/v1');

function BaseModel() {

}

BaseModel.getNow = function () {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

BaseModel.createUUID = function () {
    return uuid();
}

module.exports = BaseModel;

