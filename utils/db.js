var mysql = require('mysql');
var dbConfig = require('../config/database');

// module.exports={
//     connect:function(){
//         var connect=mysql.createConnection()
//     }
// }

function DB(config) {
    this.config = config;
}

DB.queryFormat = function (sql, args) {
    var matchIndex = 0;
    function fn(match, p1, p2) {
        if (p1) return args[matchIndex++]
        if (p2) return "'" + args[matchIndex++] + "'";
    }
    return sql.replace(/(\?)|('\?')/g, fn);
};

DB.limitFormat = function (sql, limit, offset) {
    if (!limit) {
        return sql;
    } else {
        //console.log('fasdfa',sql + " limit " + (limitStart ? limitStart : 0) + "," + rows);
        return sql + " limit " + (offset ? offset : 0) + "," + limit;
    }
};

DB.whereFormat = function (sql, filterObj) {
    var _where = [];
    var whereFilterArray = [];
    for (var i in filterObj) {
        _where.push("?='?'");
        whereFilterArray.push(i, filterObj[i]);
    };
    return sql + " where " + DB.queryFormat(_where.join(" and "), whereFilterArray);
}

DB.prototype.connect = function () {
    var connection = mysql.createConnection(this.config);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });
    return connection;
};
/**
 * 直接执行 SQL 
 */

var _query = function (sql, args, callback) {
    var connection = this.connect();
    connection.query(sql, args, callback);
    connection.end();
};

DB.prototype.query = function (sql, args) {
    var it = this;
    var promise = new Promise(function (resolve, reject) {
        function fn(err, rows, fields) {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve(rows);
            }
        }
        _query.call(it, sql, args, fn);
    });
    return promise;
};
/**
 * query 简化版,没有回调，简单的提交一次查询
 */
DB.prototype.simpleQuery = function (sql, args) {
    _query.call(this, sql, args);
}

DB.prototype.get = function (table, limit, offset) {

    var sql = DB.queryFormat("select * from ?", [table]);
    sql = DB.limitFormat(sql, limit, offset);
    return this.query(sql);
};

/**
 * 获取相关表的查询
 * @param {string} table 表的名称
 * @param {Object} filterObj 过滤键值对
 * @param {number} limit 限制数据条数
 * @param {number} offset 从哪条数据开始
 */
DB.prototype.getWhere = function (table, filterObj, limit, offset) {
    var sql = DB.queryFormat("select * from ?", [table]);
    sql = DB.whereFormat(sql, filterObj);
    sql = DB.limitFormat(sql, limit, offset);
    console.log(sql);
    return this.query(sql);
};





/**
 * 插入一条记录
 * @param {string} table 表名称
 * @param {Object} valueObj 数据键值对
 * @return {Promise} 查询结果
 */
DB.prototype.insert = function (table, valueObj) {

    var _keys = [], keys = [], _values = [], values = [];
    for (var i in valueObj) {
        _keys.push("?");
        keys.push(i);
        _values.push("'?'");
        values.push(valueObj[i]);
    }
    var sql = DB.queryFormat("insert into " + table + "(" + _keys.join(",") + ") values(" + _values.join(",") + ")", keys.concat(values));
    return this.query(sql);
}
DB.prototype.delete = function (table, filterObj) {
    var sql = DB.queryFormat("delete from ?", [table]);
    sql = DB.whereFormat(sql, filterObj);
    console.log(sql);
    return this.query(sql);
}

DB.prototype.insertBatch = function (table, valueArr) {

};

// DB.prototype.query = function (sql, args) {
//     var connection = this.connect();
//     var promise = new Promise(function (resolve, reject) {
//         connection.query(sql, args, function (err, rows, fields) {
//             //console.log(fields);
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             } else {
//                 //console.log();
//                 resolve(rows);
//             }
//         });
//         connection.end();
//     });
//     return promise;
// };

DB.prototype.getOne = function (sql, args) {

}





var db = new DB(dbConfig['default']);

for (var index in dbConfig) {
    db[index] = new DB(dbConfig[index]);
}



module.exports = db;