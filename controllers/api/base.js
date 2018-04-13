

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

Base.checkFilterObj = function (params, filterFields) {
    var obj = {};
    filterFields.forEach(function (value, index, array) {
        if (params[value]) {
            obj[value] = params[value];
        }
    });
    return obj;
};

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


// Informational

const HTTP_CONTINUE = 100;
const HTTP_SWITCHING_PROTOCOLS = 101;
const HTTP_PROCESSING = 102;            // RFC2518

// Success

/**
 * The request has succeeded
 */
const HTTP_OK = 200;

/**
 * The server successfully created a new resource
 */
const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NON_AUTHORITATIVE_INFORMATION = 203;

/**
 * The server successfully processed the request, though no content is returned
 */
const HTTP_NO_CONTENT = 204;
const HTTP_RESET_CONTENT = 205;
const HTTP_PARTIAL_CONTENT = 206;
const HTTP_MULTI_STATUS = 207;          // RFC4918
const HTTP_ALREADY_REPORTED = 208;      // RFC5842
const HTTP_IM_USED = 226;               // RFC3229

// Redirection

const HTTP_MULTIPLE_CHOICES = 300;
const HTTP_MOVED_PERMANENTLY = 301;
const HTTP_FOUND = 302;
const HTTP_SEE_OTHER = 303;

/**
 * The resource has not been modified since the last request
 */
const HTTP_NOT_MODIFIED = 304;
const HTTP_USE_PROXY = 305;
const HTTP_RESERVED = 306;
const HTTP_TEMPORARY_REDIRECT = 307;
const HTTP_PERMANENTLY_REDIRECT = 308;  // RFC7238

// Client Error

/**
 * The request cannot be fulfilled due to multiple errors
 */
const HTTP_BAD_REQUEST = 400;

/**
 * The user is unauthorized to access the requested resource
 */
const HTTP_UNAUTHORIZED = 401;
const HTTP_PAYMENT_REQUIRED = 402;

/**
 * The requested resource is unavailable at this present time
 */
const HTTP_FORBIDDEN = 403;

/**
 * The requested resource could not be found
 *
 * Note: This is sometimes used to mask if there was an UNAUTHORIZED (401) or
 * FORBIDDEN (403) error, for security reasons
 */
const HTTP_NOT_FOUND = 404;

/**
 * The request method is not supported by the following resource
 */
const HTTP_METHOD_NOT_ALLOWED = 405;

/**
 * The request was not acceptable
 */
const HTTP_NOT_ACCEPTABLE = 406;
const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
const HTTP_REQUEST_TIMEOUT = 408;

/**
 * The request could not be completed due to a conflict with the current state
 * of the resource
 */
const HTTP_CONFLICT = 409;
const HTTP_GONE = 410;
const HTTP_LENGTH_REQUIRED = 411;
const HTTP_PRECONDITION_FAILED = 412;
const HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
const HTTP_REQUEST_URI_TOO_LONG = 414;
const HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
const HTTP_EXPECTATION_FAILED = 417;
const HTTP_I_AM_A_TEAPOT = 418;                                               // RFC2324
const HTTP_UNPROCESSABLE_ENTITY = 422;                                        // RFC4918
const HTTP_LOCKED = 423;                                                      // RFC4918
const HTTP_FAILED_DEPENDENCY = 424;                                           // RFC4918
const HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL = 425;   // RFC2817
const HTTP_UPGRADE_REQUIRED = 426;                                            // RFC2817
const HTTP_PRECONDITION_REQUIRED = 428;                                       // RFC6585
const HTTP_TOO_MANY_REQUESTS = 429;                                           // RFC6585
const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;                             // RFC6585

// Server Error

/**
 * The server encountered an unexpected error
 *
 * Note: This is a generic error message when no specific message
 * is suitable
 */
const HTTP_INTERNAL_SERVER_ERROR = 500;

/**
 * The server does not recognise the request method
 */
const HTTP_NOT_IMPLEMENTED = 501;
const HTTP_BAD_GATEWAY = 502;
const HTTP_SERVICE_UNAVAILABLE = 503;
const HTTP_GATEWAY_TIMEOUT = 504;
const HTTP_VERSION_NOT_SUPPORTED = 505;
const HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506;                        // RFC2295
const HTTP_INSUFFICIENT_STORAGE = 507;                                        // RFC4918
const HTTP_LOOP_DETECTED = 508;                                               // RFC5842
const HTTP_NOT_EXTENDED = 510;                                                // RFC2774
const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;




module.exports = Base;