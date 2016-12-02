var express = require('express');
var router = express.Router();
var Api_selecter = require('../controllers/api_selecter');


router.get('/', function (req, res) {
    Api_selecter.index(req,res);
});

router.get('/daily', function (req, res) {
    Api_selecter.daily(req,res);
});

router.get('/weekly', function (req, res) {
    Api_selecter.weekly(req,res);
});

router.get('/cookie', function (req, res) {
    Api_selecter.cookie(req,res);
});


module.exports = router;