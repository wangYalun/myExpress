

function Base() {

}


Base.returnData = function (res, data, code, msg) {
    var code = code || 200, data = data || {}, msg = msg || 'success';
    var obj = {
        code: code,
        msg: msg,
        data: data
    };
    res.json(obj);
}

module.exports = Base;