var db = require('../../../utils/db');

var _ = require('underscore');


var DB = db.DB, dbConfig = db.config;

var messageDB = new DB(dbConfig['db_message_board']);


module.exports = {

    getMessageByName: function (name) {
        return messageDB.getWhere('mb_message', { name: name });
    }
}