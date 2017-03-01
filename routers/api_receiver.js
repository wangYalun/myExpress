var express = require('express');

var router = express.Router();




//post 传参测试
router.post('/', function (req, res) {

    //Api_selecter.index(req,res);
    console.log(req.query);
    console.log(req.params);
    res.json('api_receiver');
});

//只能接收 x-www-form-urlencoded 传参方式
router.post('/access_app', function (req, res) {

    //Api_selecter.index(req,res);
    console.log(req.route.methods);
    res.json({ data: req.body, email: "fsd" });
    return ;
    console.log('ni shi yige ');
    //res.sendStatus(403);
});
router.get('/access_app', function (req, res) {
    console.log(req.route.methods);
    res.json(req.query || req.params);
});


module.exports = router;