var OSS = require("ali-oss").Wrapper;


var client = new OSS({
    endpoint: "oss-cn-shenzhen.aliyuncs.com",
    accessKeyId: "LTAIN6kxH2XYKBHE",
    accessKeySecret: "hkHaDmW0tvnhWZvFjLbdu9FtMdiX0r",
    bucket: "udianbus-oss"
});

module.exports = client;