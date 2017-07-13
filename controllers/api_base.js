

/**
 * 传参数据验证
 */

var strategies = {
    isNonEmpty: function (value, errorMsg) { // 不为空
        if (value === '') {
            return errorMsg;
        }
    },
    minLength: function (value, length, errorMsg) { // 限制最小长度
        if (value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function (value, errorMsg) { // 手机号码格式
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    isEmail: function (value, errorMsg) {
        if (!/^[\w]+([-+.]\w+)*@\w+([-.]\w+)*$/.test(value)) {
            return errorMsg;
        }
    },
    isGaopengEmail: function (value, errorMsg) {

    }
};
var Validator = function () {
    this.cache = []; // 保存校验规则
};
Validator.prototype.add = function (value, rule, errorMsg) {
    var ary = rule.split(':'); // 把strategy 和参数分开
    this.cache.push(function () { // 把校验的步骤用空函数包装起来，并且放入cache
        var strategy = ary.shift(); // 用户挑选的strategy
        ary.unshift(value); // 把input 的value 添加进参数列表
        ary.push(errorMsg); // 把errorMsg 添加进参数列表
        return strategies[strategy].apply(value, ary);
    });
};
Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
        if (msg) { // 如果有确切的返回值，说明校验没有通过
            return msg;
        }
    }
};

var validatorFunc = function (params, validatorArgs) {
    var validator = new Validator(); // 创建一个validator 对象
    /***************添加一些校验规则****************/

    if (!validatorArgs) return "";
    for (var i in validatorArgs) {
        validatorArgs[i].unshift(params[validatorArgs[i].shift()]);
        console.log(validatorArgs[i]);
        validator.add.apply(validator, validatorArgs[i]);
    }
    var errorMsg = validator.start(); // 获得校验结果
    console.log(errorMsg);
    return errorMsg;
}

function Apibase() {

}

Apibase.prototype.checkParam = function (req, validatorArgs) {

    var obj = {
        isTrue: false,
        errorMsg: "",
        params: {}
    };

    if (req.method === 'GET' || req.method === "DELETE") {
        params = req.query;
    } else if (req.method === 'POST' || req.method === 'PUT') {
        params = req.body;
    } else {
        params
    }

    obj.params = params;

    //参数验证
    var errorMsg = validatorFunc(params, validatorArgs);
    if (errorMsg) {
        obj.errorMsg = errorMsg;
        return obj;
    }

    obj.isTrue = true;
    return obj;

}

Apibase.prototype.returnData = function (res, data, code, msg) {
    var code = code || 200, data = data || {}, msg = msg || 'success';
    var obj = {
        code: code,
        msg: msg,
        data: data
    };
    res.json(obj);
}

module.exports = new Apibase();