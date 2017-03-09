/**
 * node 测试 数据库类
 */
// var db = require('./utils/db');


//直接查询
db.query("show tables").then(function (result) {
    console.log(result);
});

//

//db.simpleQuery("insert into `admin_user`(email,mobile_phone,password,nickname) values('allen.wang@gaopeng.com','18600699358',md5('18942339954wang'),'卡卡罗特伦')");

// db.get('admin_user',1,0).then(function(result){
//     console.log("affectedRows:",result.affectedRows);
//     console.log(result);
// });

db.getWhere('admin_user',{email:"326402399@qq.com"}).then(function(result){
    console.log(result);
});

db.insert('admin_user',{email:"fa132132113212311sd",mobile_phone:"fasdf",password:"1423412",nickname:'fasdfa'})
.then(function(result){
    console.log("insertID:",result.insertId);
    console.log("affectedRows:",result.affectedRows);
    console.log("changedRows:",result.changedRows);
},function(err){

});

(function () {
    var numArray = [1, 3, 5, 7, 9, 11, 13, 15];

    numArray.forEach(function (item) {
        var num1 = item;
        numArray.forEach(function (item) {
            var num2 = item;
            numArray.forEach(function (item) {
                var num3 = item;
                //console.log(num1,num2,num3);
                if (num1 + num2 + num3 === 30) {
                    console.log(num1, num2, num3);
                }
            });
        });
    });
})();



