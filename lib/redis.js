
//Redis 使用文档，参考http://www.runoob.com/redis/redis-tutorial.html
//Redis Node-API 使用文档，参考https://npm.taobao.org/package/redis
/**
 * Redis Windows 使用方法
 * $ ./redis-server.exe redis.windows.conf //启动Redis服务
 * //客户端
 * $ redis-cli //默认链接
 * $ redis-cli -h host -p port -a password
 * $ 
 */
var redis = require('redis');


function Redis(config) {
    this.config = config;

    this.client = redis.createClient(this.config);
}


//将Redis 改成 命令输入模式
Redis.prototype.query = Redis.prototype.command = function (command) {
    var client = this.client;

    var args = command.split(/\s+/);

    var promise = new Promise(function (resolve, reject) {
        args.push(function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
        //console.log(args.shift().toLowerCase())
        client[args.shift().toLowerCase()].apply(client, args);
        //client.quit();
    });
    return promise;
}

/**
 * Redis 字符串 
 * set key value 设置指定key的值
 * get key 获取指定key的值
 * getrange key start end 返回key 中字符串的子字符
 * getset key value 将给定的key的值设为value ,并返回key的旧值
 * 
 */




module.exports = Redis;





