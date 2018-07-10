var Base = require('../base');

var db = require('../../../utils/db');

var moment = require('moment');


var DB = db.DB, dbConfig = db.config;

var messageDB = new DB(dbConfig['db_message_board']);





module.exports = {
    getMessageByName: function (req, res) {
        var name = req.query.name;
        if (!name) {
            Base.returnData(res, {});
        } else {
            messageDB.getWhere('mb_message', { name: name }).then(function (result) {
                Base.returnData(res, result);
            });
        }
    },
    /**
     * 增加线路
     * @method post
     * @param 
     */
    addMessage: function (req, res) {
        var create_time = moment().format("YYYY-MM-DD HH:mm:ss");


        var checkParams = Base.checkParams_2(req.body, {
            isNonEmpty: ['name', 'phone_num', 'content'],
            isMobile: ['phone_num']
        });

        if (checkParams.errorMsg) {
            Base.returnData(res, {}, 400, checkParams.errorMsg);
            return;
        }
        var params = checkParams.params;


        messageDB.insert('mb_message', { name: params.name, phone_num: params.phone_num, content: params.content, create_time: create_time })
            .then(function (result) {
                console.log(result);
                if (result.affectedRows >= 1) {
                    Base.returnData(res, { id: result.insertId });
                } else {
                    Base.returnData(res, {}, 400, '提交留言失败');
                }
            })
    }
}