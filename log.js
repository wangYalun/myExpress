var log4js = require('log4js');

//获取当前运行环境
var env = process.env.NODE_ENV || "development";

log4js.configure({
    appenders: {
        access: { type: 'file', filename: './logs/access.log', maxLogSize: 1024 },
        console: { type: "console" },
        file: { type: "file", filename: "./logs/cheese.log", maxLogSize: 1024 }
    },
    categories: {
        access: { appenders: ['access'], level: "info" },
        cheese: { appenders: ['file'], level: "info" },
        default: { appenders: ['console'], level: "production" === env ? 'info' : 'debug' }
    },

    //set this to true if you’re running your app using pm2, 
    //otherwise logs will not work (you’ll also need to install pm2-intercom as pm2 module: pm2 install pm2-intercom)
    pm2: true,
    // disableClustering:true
});

module.exports.logger = function (name) {
    //如果不指定日志类型，则默认为控制台类型日志，
    //在development 情况下级别为最高级（包括DEBUG及以下都打印出来）
    return log4js.getLogger(name || "default");

}