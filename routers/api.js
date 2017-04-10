/**
 * 测试用接口
 */

var express = require('express');

var fs=require('fs');

var router = express.Router();

router.get('/',function(req,res){
    var params=req.query||req.params;
    res.json(params);
});

router.get('/get_js',function(req,res){
    fs.readFile('api_test.js',function(err){
        if(err){

        };
        res.sendFile('routers/api_test.js');
    });
});

router.get('/products',function(req,res){
    res.json([{name:"allen",id:1},{name:"bob",id:2}]);
});

module.exports=router;