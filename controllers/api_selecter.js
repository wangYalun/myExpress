

module.exports={
    index:function(req,res){
        res.send('api_selecter/index');
    },
    daily:function(req,res){
        res.send('api_selecter/daily');
    },
    weekly:function(req,res){
        res.send('api_selecter/weekly');
    }
}