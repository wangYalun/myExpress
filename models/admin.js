var db=require('../utils/db');


function login(username,password){

    var promise=new Promise(function(resolve,reject){
        db.query("select uid,email,nickname,flag from admin_user where email=? and password=md5(?)",[username,password])
        .then(resolve);
    });
    return promise;
}

login.log=function(obj){
    db.insert('table name',obj);
}
module.exports={
    login:login
}