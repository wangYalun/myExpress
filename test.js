/**
 * node 测试 数据库类
 */
var db=require('./utils/db');


//直接查询
db.query("show tables").then(function(result){
    console.log(result);
});

//

