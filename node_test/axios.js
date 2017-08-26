
var axios = require('axios');

var qs = require('qs');

var postman = axios.create({
    baseURL: 'http://localhost:8081'
});

postman.post('/api/login', qs.stringify({ username: '326402399@qq.com', password: "18942339954wang" }))
    .then(function (res) {
        console.log(res);
    });