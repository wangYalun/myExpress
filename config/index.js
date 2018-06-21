
var env = process.env.NODE_ENV || "development";


/**
 * 加载相关配置文件
 */

var dbConfigPath = "./database.js";
var redisConfigPath = "./redis.config.js";


switch (env) {
    case "production":
        dbConfigPath = "./production/database.js";
        redisConfigPath = './production/redis.config.js';
        break;
    case "testing":
        dbConfigPath = "./testing/database.js";
        redisConfigPath = './testing/redis.config.js';
        break;
    case "development":
    default:
        dbConfigPath = "./database.js";
        redisConfigPath = './redis.config.js';

}


var dbConfig = require(dbConfigPath);

var redisConfig = require(redisConfigPath);


module.exports = {
    dbConfig: dbConfig,
    redisConfig: redisConfig
}
