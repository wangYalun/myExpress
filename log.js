var log4js = require('log4js');

log4js.configure({
    appenders: {
        access: { type: 'file', filename: './logs/access.log', maxLogSize: 1024 },
        console: { type: "console" },
        file: { type: "file", filename: "./logs/cheese.log", maxLogSize: 1024 }
    },
    categories: {
        access: { appenders: ['access'], level: "info" },
        cheese: { appenders: ['file'], level: "info" },
        default: { appenders: ['console'], level: 'debug' }
    }
});

module.exports.logger = function (name) {
    return log4js.getLogger(name || "default");
}