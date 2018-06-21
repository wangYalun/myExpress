var RedisClient = require('../lib/redis.js');



var redisConfig = require('../config/redis.config');


var redisClient = new RedisClient(redisConfig['default']);


module.exports = redisClient;