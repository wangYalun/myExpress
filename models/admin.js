var db = require('../utils/db');

function handleResult(queryPromise){
    var promise=new Promise(function(resolve,reject){
        queryPromise.then(function(result){
            if(Array.isArray(result)){
                resolve(result);
            }else{
                
            }
        });
    });
}


function login(username, password) {

    var promise = new Promise(function (resolve, reject) {
        db.query("select uid,email,nickname,flag from admin_user where email=? and password=md5(?)", [username, password])
            .then(resolve);
    });
    return promise;
}

function dapengLogin(username, password) {
    return new Promise(function (resolve, reject) {
        db.query("select * from where username=? and password=md5(?)", [username, password]).then(resolve);
    });
}

login.log = function (obj) {
    db.insert('table name', obj);
}
module.exports = {
    login: login,
    dapengLogin: dapengLogin
}