

var Base = require('../base');

var crypto = require('crypto');

var https = require('https');

var uuid = require('uuid');

//const Wechat = require('wechat-jssdk');


const wechatConfig = require('../../../config/weixin/wechat.config').wechatConfig;

//const wx = new Wechat(wechatConfig);

const createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
}

const createTimestamp = function () {
    return Math.floor(+new Date() / 1000);
}

//获取access token

function myHttpRequest(options) {


}

myHttpRequest.get = function (url) {

    var promise = new Promise((resolve, reject) => {
        const req = https.get(url, res => {

            res.on('data', d => {
                resolve(JSON.parse(d.toString()));
            });
        });
        req.on('error', e => {
            reject(e);
        });
        req.end();
    });
    return promise;
}

function getAccessToken(appid, appSecret) {



    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + appSecret;

    return myHttpRequest.get(url);

}

//获取jsapi_ticket
function getJSAPITicket(access_token) {

    var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";

    return myHttpRequest.get(url);
}






module.exports = {
    checkSignature: function (req, res) {
        var signature = req.query.signature;
        var timestamp = req.query.timestamp;
        var nonce = req.query.nonce;
        var echostr = req.query.echostr;

        /*  加密/校验流程如下： */
        //1. 将token、timestamp、nonce三个参数进行字典序排序
        var array = new Array('allen', timestamp, nonce);
        array.sort();
        var str = array.toString().replace(/,/g, "");

        //2. 将三个参数字符串拼接成一个字符串进行sha1加密
        var sha1Code = crypto.createHash("sha1");
        var code = sha1Code.update(str, 'utf-8').digest("hex");

        //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        if (code === signature) {
            res.send(echostr)
        } else {
            res.send("error");
        }
    },
    getSignature: function (req, res) {
        wx.jssdk.getSignature(req.query.url).then(function (signatureDate) {
            res.json(signatureDate);
        });
    },
    getSignature2: function (req, res) {

    },
    getConfig: function (req, res) {

        console.log(req.headers.referer);

        getAccessToken(wechatConfig.appId, wechatConfig.appSecret).then(access_res => {

            getJSAPITicket(access_res.access_token).then(ticket_res => {

                var noncestr = createNonceStr();
                var timestamp = createTimestamp();

                var str = "jsapi_ticket=" + ticket_res
                    + "&noncestr=" + noncestr
                    + "&timestamp=" + timestamp
                    + "&url=" + req.headers.referer;

                //签名
                var sha1Code = crypto.createHash("sha1");
                var signature = sha1Code.update(str, 'utf-8').digest("hex");

                var jsText = 'wx.config({debug:true,appId:"' + wechatConfig.appId + '",timestamp:"' + timestamp + '",nonceStr:"' + noncestr + '",signature:"' + signature + '",jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","hideOptionMenu","showMenuItems","hideMenuItems"]})';

                res.set('Content-Type', 'application/x-javascript');
                res.send(jsText);

            });
        });







    }



}