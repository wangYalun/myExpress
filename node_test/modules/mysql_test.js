var mysql = require('mysql');


var sql = "select * from ??";

sql = mysql.format(sql, ['admin_login_log']);

sql = sql + " where ??=?";

sql = mysql.format(sql, ['id', '3']);


function format(sql, args) {
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

var sql = "select * from ??";

sql = format(sql, ['admin_login_log']);

sql = sql + " where ??=?";

sql = format(sql, ['id', 3]);

console.log(sql);