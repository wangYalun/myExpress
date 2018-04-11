
var dbConfig = require('../config/index').dbConfig;

var DB = require('../lib/db');



var db = new DB(dbConfig['production_ydbus']);


module.exports = db;

module.exports.config = dbConfig;

module.exports.DB = DB;
