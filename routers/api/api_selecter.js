var express = require('express');


var router = express.Router();

var ApiSelecter = require('../../controllers/api_selecter');

router.get('/today', function (req, res) { ApiSelecter.today(req, res); });

module.exports = router;