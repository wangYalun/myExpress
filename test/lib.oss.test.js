


var OSS = require('ali-oss').Wrapper;


var client = require('../lib/oss');


// client.listBuckets().then(function (res) {
//     console.log(res);
// });

client.put("test/index.html",'../public/index.html').then(function(res){
    console.log(res);
});