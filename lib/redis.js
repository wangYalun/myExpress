var redis = require('redis');




function Redis(config) {
    this.config = config;

    this.client = redis.createClient(this.config);
}



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




module.exports = Redis;





