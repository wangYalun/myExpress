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
router.post('/access_app',function (req, res) {

    //Api_selecter.index(req,res);
   
    res.json(req.body);
});


module.exports = router;