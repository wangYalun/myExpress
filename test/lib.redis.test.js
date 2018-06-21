var RedisClient = require('../lib/redis.js');




// redisClient.on("error",function(error){

// });

// redisClient.set("name","allen2",function(err){

// });

// redisClient.get("name",function(res){
//     console.log(res);
// });

// var redis = require('redis');

// var promisify = require('util').promisify;

var redisConfig = require('../config/redis.config');

// var client = redis.createClient(redisConfig['default']);


// var getAsync = promisify(client.get).bind(client);

// getAsync("name").then(function (res) { console.log(res) });

// client.get("name", function (err, reply) {
//     console.log(reply);
// });


var redisClient = new RedisClient(redisConfig['default']);

redisClient.query("set name2 allen3").then(function (res) {
    console.log(res);
});

redisClient.query("mget aaaaa allen").then(function (res) {
    console.log(res);//如果存在，则返回字符串数据，如果不存在，返回null
});

redisClient.command("get allen").then(function (res) { console.log(res) });

// redisClient.command("zrange schools 0 10").then(function (res) { console.log(res) });

// redisClient.command("lpush hahaha fhasdfasd fasdfasdf fahhfhashd fasdfasdfasdf").then(function (res) {
//     console.log(res);
//     redisClient.command("lrange hahaha 0 10").then(function (res) { console.log(res) });
// })

// redisClient.command("smembers age").then(function (res) { console.log(res) });





// redisClient.query("")