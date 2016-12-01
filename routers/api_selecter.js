var express = require('express');
var router = express.Router();
var Api_selecter = require('../controllers/api_selecter');


router.get('/', function (req, res) {

    Api_selecter.index(req,res);
    //res.send('api_selecter/');
});

router.get('/daily', function (req, res) {
    Api_selecter.daily(req,res);
    //res.send('api_selecter/daily');
});

router.get('/weekly', function (req, res) {
    Api_selecter.weekly(req,res);
    //res.send('api_selecter/daily');
});


module.exports = router;