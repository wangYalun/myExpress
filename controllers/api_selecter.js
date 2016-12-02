var selecter = require('../models/selecter');

module.exports={
    index:function(req,res){
        //GET 传参
        var params=req.query||req.params;
        
        res.send('api_selecter/index');
    },
    daily:function(req,res){
        //将参数传到对应模型,然后由模型返回result,再处理result
        selecter.daily(req.query.name).then(function(result){
            res.send(result);
        });
        //res.send('api_selecter/daily');
    },
    weekly:function(req,res){
        res.send('api_selecter/weekly');
    }
}