

/**
 * 传参数据验证
 */

var strategies = {
    isRequired: function (value, errorMsg) {
        if (value === undefined || value === null) {
            return errorMsg;
        }
    },
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
    isNumber: function (value, errorMsg) {
        if (value === undefined || value === null) {
            return;
        }
        if (isNaN(+value)) {
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
        validator.add.apply(validator, validatorArgs[i]);
    }
    var errorMsg = validator.start(); // 获得校验结果
    return errorMsg;
}


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

Base.checkParams = function (params, validatorArgs) {
    var obj = {
        errorMsg: "",
        params: params
    };


    //参数验证
    var errorMsg = validatorFunc(obj.params, validatorArgs);
    if (errorMsg) {
        obj.errorMsg = errorMsg;
        return obj;
    }

    return obj;
}

/**
 * 返回需要的，切不为空的字段
 * @param {Object} params 
 * @param {Array} filterFields
 * @return {Object} 
 */
Base.checkFilterObj = function (params, filterFields) {
    var obj = {};
    filterFields.forEach(function (value, index, array) {
        if (params[value]) {
            obj[value] = params[value];
        }
    });
    return obj;
};

/**
 * 参数校验_2 分类功能
 * @param {Object} params
 * @param {Object} validatorObj 
 * {
        isNonEmpty: ['arrive_time', 'start_time', 'line_no', 'line_name', 'once_price',
                'line_mode', 'org_id', 'line_type', 'check_ticket_type', 'default_inventory', 'is_section_price'],
        isNumber: ['default_inventory', 'once_price', 'mileage']

        @return {Object} {errorMsg:"",params:{}}
 */
Base.checkParams_2 = function (params, validatorObj) {
    var validatorArgs = [];
    var errorMsg = {
        isNonEmpty: "不能缺省或为空字符",
        isRequired: "不能缺省",
        isNumber: "必须为数字",
        isEmail: "必须是邮箱",
        isMobile: '必须是手机号码'
    }
    for (var i in validatorObj) {
        if (Array.isArray(validatorObj[i])) {
            validatorObj[i].forEach(function (value, index) {
                validatorArgs.push([value, i, value + errorMsg[i]])
            });
        }
    }

    return Base.checkParams(params, validatorArgs);
}


module.exports = Base;