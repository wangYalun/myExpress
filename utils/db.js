
//https://github.com/mysqljs/mysql
var mysql = require('mysql');
var dbConfig = require('../config/database');

var uuid = require('uuid/v1');

// module.exports={
//     connect:function(){
//         var connect=mysql.createConnection()
//     }
// }

function DB(config) {
    this.config = config;
    //默认开启连接池
    this.pool = this.createPool();
}

DB.uuid = function () {
    return uuid();
}
DB.queryFormat = function (sql, args) {
    if (mysql.format) {
        return mysql.format(sql, args);
    }
    var matchIndex = 0;
    function fn(match, p1, p2) {
        if (p1) return "`" + args[matchIndex++] + "`"
        if (p2) {
            var arg = "";
            if (typeof args[matchIndex] === 'string') {
                arg = "'" + args[matchIndex] + "'";
            } else {
                arg = args[matchIndex];
            }
            matchIndex++;
            return arg;
        }
    }
    return sql.replace(/(\?\?)|(\?)/g, fn);
};

DB.limitFormat = function (sql, limit, offset) {
    if (!limit) {
        return sql;
    } else {
        //console.log('fasdfa',sql + " limit " + (limitStart ? limitStart : 0) + "," + rows);
        return sql + " limit " + (offset ? offset : 0) + "," + limit;
    }
};

DB.whereFormat = function (sql, filterObj, whereOrAnd, isOr) {
    if (!filterObj) {
        return sql;
    }
    var _where = [];
    var whereFilterArray = [];

    for (var i in filterObj) {
        if (i === 'query_name') {
            continue;
        }
        if (typeof filterObj[i] === 'object') {
            if (filterObj[i].isLike) {
                _where.push("?? like ?");
                whereFilterArray.push(i, filterObj[i].isPrefix ? filterObj[i].value + "%" : (filterObj[i].isSuffix ? "%" + filterObj[i].value : "%" + filterObj[i].value + "%"));
            } else {
                _where.push("??=?");
                whereFilterArray.push(i, filterObj[i].value);
            }
        } else {
            _where.push("??=?");
            whereFilterArray.push(i, filterObj[i]);
        }
    }
    if (typeof filterObj['query_name'] === 'object') {
        var fields = filterObj['query_name'].fields || [];
        var or_array = [];
        fields.forEach(function (value, index) {
            or_array.push("?? like ?");
            whereFilterArray.push(value, "%" + filterObj['query_name'].value + "%");
        });
        _where.push("(" + or_array.join(" or ") + ")");
    }
    if (_where.length === 0) {
        return sql;
    }

    return sql + " " + (whereOrAnd || "where") + " " + DB.queryFormat(_where.join(isOr ? " or " : " and "), whereFilterArray);
}
DB.orFormat = function (sql, filterObj, whereOrAnd) {
    return DB.whereFormat(sql, filterObj, whereOrAnd, true);
}

DB.setValueFormat = function (sql, valueObj) {
    var _set = [];
    var setValueArray = [];
    for (var i in valueObj) {
        _set.push("??=?");
        setValueArray.push(i, valueObj[i]);
    }
    return sql + " set " + DB.queryFormat(_set.join(" , "), setValueArray);
}

DB.orderFormat = function (sql, orderObj) {
    var _order = [];
    var _orderArr = [];
    for (var i in orderObj) {
        if (/^desc$/i.test(orderObj[i])) {
            _order.push(' ?? desc');
            _orderArr.push(i);
        } else {
            _order.push(' ?? ');
            _orderArr.push(i);
        }
    }
    return sql + (_order.length ? DB.queryFormat(" order by " + _order.join(','), _orderArr) : "");
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
DB.prototype.createPool = function () {
    //console.log(this.config);
    return mysql.createPool(this.config);
}
DB.prototype.endPool = function () {
    if (this.pool) {
        this.pool.end();
    }
}
/**
 * 直接执行 SQL 
 */

var _query_ = function (sql, args, callback) {
    console.log(sql);
    var connection = this.connect();
    connection.query(sql, args, callback);
    connection.end();
};

var _query = function (sql, args, callback) {
    console.log(sql);
    this.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        connection.query(sql, args, function (err, rows, fields) {
            callback(err, rows, fields);
            connection.release();
        })
        // connection.query(sql, args, callback);
        // connection.release();
    });
}

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


/**
 * 获取相关表的所有数据，加上
 */
DB.prototype.get = function (table, limit, offset) {

    var it = this;

    var countSQL = DB.queryFormat("select count(*) as size from ??", [table]);

    var promise = new Promise(function (resolve, reject) {
        it.query(countSQL).then(function (result) {
            var size = result[0] && result[0].size;

            var sql = DB.queryFormat("select * from ??", [table]);
            sql = DB.limitFormat(sql, limit, offset);

            it.query(sql).then(function (result) {
                var obj = {};
                obj.size = size;
                obj.data = result;
                resolve(obj);
            });
        })
    });

    return promise;
};

/**
 * 统计查询的数据条数，用于分页
 * @param {string} table 表名称
 * @param {Object} filterObj 过滤条件
 * @param {string}
 * @return {Promise} 返回数据总条数[{size:xx}]
 */
DB.prototype.count = function (table, filterObj, countField, sizeName, ) {
    var countField = countField || "*", sizeName = sizeName || "size";
    var sql = DB.queryFormat("select count(" + countField + ") as ?? from ??", [sizeName, table]);
    sql = DB.whereFormat(sql, filterObj);
    return this.query(sql);
}
/**
 * 统计查询的数据条数，直接SQL查询，用于分页
 */
DB.prototype.countBySQL = function (sql) {
    return this.query(sql);
}



/**
 * 获取相关表的查询
 * @param {string} table 表的名称
 * @param {Object} filterObj 过滤键值对
 * @param {number} limit 限制数据条数
 * @param {number} offset 从哪条数据开始
 */
DB.prototype.getWhere = function (table, filterObj, limit, offset, orderObj) {
    var sql = DB.queryFormat("select * from ??", [table]);
    sql = DB.whereFormat(sql, filterObj);
    sql = DB.orderFormat(sql, orderObj);
    sql = DB.limitFormat(sql, limit, offset);
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
        _keys.push("??");
        keys.push(i);
        _values.push("?");
        values.push(valueObj[i]);
    }
    var sql = DB.queryFormat("insert into " + table + "(" + _keys.join(",") + ") values(" + _values.join(",") + ")", keys.concat(values));

    return this.query(sql);
}
/**
 * 删除若干条记录
 * @param {string} table 表名称
 * @param {Object} filterObj 过滤键值对对象
 * @return {Promise} 查询结果
 */
DB.prototype.delete = function (table, filterObj) {
    var sql = DB.queryFormat("delete from ??", [table]);
    sql = DB.whereFormat(sql, filterObj);
    console.log(sql);
    return this.query(sql);
}
/**
 * 更新若干条记录
 * @param {string} table 表名称
 * @param {Object} valueObj 数据键值对
 * @param {Object} filterObj 过滤键值对对象
 * @return {Promise} 查询结果
 */
DB.prototype.update = function (table, valueObj, filterObj) {
    var sql = DB.queryFormat("update ??", [table]);
    sql = DB.setValueFormat(sql, valueObj);
    sql = DB.whereFormat(sql, filterObj);
    //console.log(sql);
    return this.query(sql);
}
/**
 * 插入若干条数据
 * @param {string} table 表名称
 * @param {Array<Object>} valueObjArr 数据对象数组
 * @return {Promise} 查询结果
 */
DB.prototype.insertBatch = function (table, valueObjArr) {

};

/**
 * 只获取匹配的第一条数据
 * 
 */
DB.prototype.getOne = function (sql, args) {


}






var db = new DB(dbConfig['default']);

// for (var index in dbConfig) {
//     db[index] = new DB(dbConfig[index]);
// }



module.exports = db;

module.exports.config = dbConfig;

module.exports.DB = DB;