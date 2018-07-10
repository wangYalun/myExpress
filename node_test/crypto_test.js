
var crypto = require('crypto');


var hash = crypto.createHash('md5');

hash.update("allen");

console.log(hash.digest("hex"));