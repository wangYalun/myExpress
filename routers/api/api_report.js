/**
 * 报表使用的接口
 */

var express = require('express');

var fs = require('fs');

var router = express.Router();

var jwt = require('jsonwebtoken');


var auth = require('./auth');


router.get('/', function (req, res) {

    res.json({ name: 'allen' });
});



module.exports = router;