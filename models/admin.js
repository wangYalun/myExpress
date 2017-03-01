var db=require('../utils/db');


function login(username,password){

    var promise=new Promise(function(resolve,reject){
        db.query("select * from admin_user where email=? and password=md5(?)",[username,password])
        .then(resolve);
    });
    return promise;
}

module.exports={
    login:login
}