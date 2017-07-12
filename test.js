/**
 * node 测试 数据库类
 */
var db = require('./utils/db');

var _ = require('underscore');


//直接查询
(function () {
    db.query("show tables").then(function (result) {
        console.log(result);
    });

    //

    //db.simpleQuery("insert into `admin_user`(email,mobile_phone,password,nickname) values('allen.wang@gaopeng.com','18600699358',md5('18942339954wang'),'卡卡罗特伦')");

    // db.get('admin_user',1,0).then(function(result){
    //     console.log("affectedRows:",result.affectedRows);
    //     console.log(result);
    // });

    db.getWhere('admin_user', { email: "326402399@qq.com" }).then(function (result) {
        console.log(result);
    });

    db.insert('admin_user', { email: "fa132132113212311sd", mobile_phone: "fasdf", password: "1423412", nickname: 'fasdfa' })
        .then(function (result) {
            console.log("insertID:", result.insertId);
            console.log("affectedRows:", result.affectedRows);
            console.log("changedRows:", result.changedRows);
        }, function (err) {

        });
});
(function () {
    db.query("select count(*) as size from admin_login_log;select * from admin_login_log").then(function (result) {
        //console.log(typeof result);
        console.log(result);
    });
});

(function () {
    // db.get('admin_login_log', 1, 10).then(function (result) {
    //     console.log(result);
    // });
    // db.count('admin_login_log').then(function (result) {
    //     console.log(result);
    // });
    //db.search('admin_login_log')

    var local_db = new db.DB(db.config['localhost']);

    local_db.query('select * from admin_user').then(function (result) {
        console.log(result);
        local_db.endPool();
    });
    // local_db.endPool();
});

var fs = require('fs');
(function () {
    var ydbus_db = new db.DB(db.config['ydbus']);

    ydbus_db.query('show tables').then(function (result) {

        result.map(function (item, index) {
            ydbus_db.query('show create table ' + item.Tables_in_ydbus).then(function (result) {
                fs.writeFile('./database/ydbus.sql', result[0]['Create Table'] + ";\n", { flag: 'a' }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            });
        });

    });
})();

(function () {
    var obj = _.pick.apply(_, [{ name: 'allen', age: 20 }, 'name']);
    console.log(obj);
});







