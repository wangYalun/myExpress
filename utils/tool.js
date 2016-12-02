module.exports = {
    /**
     * 日期格式化
     */
    formatDate(date, fmt) {
        var it = this;
        if (typeof date !== 'object') {
            date = it.toDate(date);
        }
        if (typeof fmt !== 'string') {
            fmt = "yyyy-MM-dd HH:mm:ss";
        }
        if (null == date) {
            return "";
        }
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S+": date.getMilliseconds() //毫秒
        };
        var week = { "0": "日", "1": "一", "2": "二", "3": "三", "4": "四", "5": "五", "6": "六" };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    /**
     * 获取URL参数
     */
    getUrlParam: function (url) {
        if (url.indexOf("?") === -1) {
            return {};
        }
        var paraString = url.substring(url.lastIndexOf("?") + 1, url.length).split("&"),
            paraObj = {};
        var i, j;
        for (i = 0; j = paraString[i]; i++) {
            var key = j.substring(0, j.indexOf("="));
            var value = j.substring(j.indexOf("=") + 1, j.length);
            value = value ? value.split("#")[0] : "";
            paraObj[key] = decodeURIComponent(value);
        }
        return paraObj;
    },
    /**
     * 转换成URL参数
     */
    toUrlParam(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(i + "=" + obj[i]);
        }
        return arr.join("&");
    },
    /**
     * 转换为对象
     */
    toJson(str) {
        var it = this;
        var json = {};
        if (!str) {
            return json;
        } else if (typeof str === "string") {
            try {
                var ss = str.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
                json = eval("json=" + ss);
            } catch (err) {
                console.error("toJsonErr:" + it.toString(err));
            } finally {
                return json;
            }
        } else {
            return str;
        }
    },
    /**
     * 转换为日期对象
     */
    toDate(str) {
        if (typeof str === 'number') {
            return new Date(str);
        } else if (!isNaN(str)) {
            if (str.indexOf(".") !== -1 || str.length <= 10) {
                //如果单位为秒，则乘以1000
                return new Date(str * 1000);
            } else {
                return new Date(str * 1);
            }
        } else if (typeof str === 'string') {
            var date = new Date(str.replace(/-/g, "/"));
            return date;
        } else {
            return str;
        }
    },
    /**
     * json转换成字符串
     * @param {type} json
     */
    toString(json) {
        var it = this;
        var type = typeof json;
        var res = json;
        if (!json || type === 'string') {
            res = json;
        } else if (json instanceof Array) {
            res = JSON.stringify(json);
        } else if (type === 'object') {
            res = JSON.stringify(json);
        } else if (json instanceof Date) {
            res = it.formatDate(json);
        } else {
            res = json;
        }
        return res;
    },
    /**
     * 判断是否为空，0不为空
     */
    isNull: function (obj) {
        if (obj === undefined || obj === null || obj === "") {
            return true;
        } else if (typeof obj == "object") {
            for (var i in obj) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    },
    isNumber: function (str) {
        var it = this;
        if (it.isNull(str)) {
            return false;
        }
        if (str.match(/^[\d]+[\.]?[\d]*$/)) {
            return true;
        }
        return false;
    },
    isInt: function () {
        var it = this;
        if (it.isNull(str)) {
            return false;
        }
        if (str.match(/^[\d]+$/)) {
            return true;
        }
        return false;
    },
    isEmail: function () {
        var it = this;
        if (it.isNull(str)) {
            return false;
        }
        if (str.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)) {
            return true;
        }
        return false;
    },
    isMobile: function () {
        var it = this;
        if (it.isNull(str)) {
            return false;
        }
        if (str.match(/^1[3-9]{1}[\d]{9}$/)) {
            return true;
        }
        return false;
    },
    isTel: function () {
        var it = this;
        if (it.isNull(str)) {
            return false;
        }
        if (str.match(/^[0]{1}[\d]{10}$/)) {
            return true;
        }
        return false;
    },
    isPersonNO: function () {
        var it = this;
        if (it.isNull(str)) {
            return false;
        }
        if (str.match(/^(\d{18,18}|\d{15,15}|\d{17,17}x)$/)) {
            return true;
        }
        return false;
    },
    /**
     * 参数校验["username", "用户名", "testname","required", "Integer", "Number"]
     *           参数key    参数含义   默认值     条件格式...
     */
    checkParam: function (request, paramArr) {
        var it = this;
        console.log(request.url);
        var params = it.getUrlParam(request.url);
        Object.assign(params, request.body);
        console.log(params);
        var isOk = true;
        var sb = [];
        for (var item of paramArr) {
            var key = item[0];
            var label = item[1];
            var defValue = item[2];
            var value = params[key];
            if (it.isNull(value)) {
                value = params[key] = defValue;
            }
            for (var i = 3; i < item.length; i++) {
                var str = item[i];
                if (str.startsWith("regx(")) {
                    var regx = str.substring(5, str.length - 1);
                    if (!str.match(regx)) {
                        isOk = false;
                        sb.push(label + "格式不正确");
                    }
                }
                if (str.toLowerCase() == "required") {
                    if (it.isNull(value)) {
                        isOk = false;
                        sb.push(label + "不能为空");
                    }
                }
                if (!it.isNull(value)) {
                    if (str.toLowerCase() == "number") {
                        if (!it.isNumber(value)) {
                            isOk = false;
                            sb.push(label + "必须是数字");
                        }
                    } else if (str.toLowerCase() == "Integer" || str.toLowerCase() == "int") {
                        if (!it.isInt(value)) {
                            isOk = false;
                            sb.push(label + "必须是整数");
                        }
                    } else if (str.toLowerCase() == "email") {
                        if (!it.isEmail(value)) {
                            isOk = false;
                            sb.push(label + "必须是邮箱格式");
                        }
                    } else if (str.toLowerCase() == "mobile") {
                        if (!it.isMobile(value)) {
                            isOk = false;
                            sb.push(label + "必须是手机号格式");
                        }
                    } else if (str.toLowerCase() == "personNO") {
                        if (!it.isPersonNO(value)) {
                            isOk = false;
                            sb.push(label + "必须是15位或18位身份证");
                        }
                    } else if (str.toLowerCase() == "tel") {
                        if (!it.isTel(value)) {
                            isOk = false;
                            sb.push(label + "必须是座机号码格式");
                        }
                    } else {

                    }
                }
            }
        }
        params.isOk = isOk;
        params.msg = sb.join(",");
        return params;
    },
    returnData: function (response, obj, code = 200) {
        var data = {
            data: obj,
            code: code
        };
        return response.send(data);
    },
    returnError: function (response, obj = "", code = 400) {
        var err = {
            msg: obj,
            code: code
        }
        return response.send(err);
    }
}
