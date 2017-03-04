/**
 * 测试用接口
 */

var express = require('express');

var router = express.Router();

router.get('/',function(req,res){
    var params=req.query||req.params;
    res.json(params);
});

module.exports=router;