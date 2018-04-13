module.exports = {
    "default": {
        host: '119.23.76.55',//填写数据库地址
        user: 'ydbus', //用户名
        password: 'ydbus',//
        database: 'ydbus',// 默认连接数据库 
        port: 43306
    },
    "local": {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "ydbus"
    },
    "production": {
        host: "172.18.1.31",
        user: "ydbus",
        password: "ydbus",
        database: "ydbus"
    }
};