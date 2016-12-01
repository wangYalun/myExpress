var express = require('express');
var router = express.Router();



router.post('/', function (req, res) {

    //Api_selecter.index(req,res);
    console.log(req.query);
    console.log(req.params);
    res.json('api_receiver');
});

router.post('/access_app',function (req, res) {

    //Api_selecter.index(req,res);
   
    res.json(req.body);
});


module.exports = router;