
var express = require('express');
var login = require('../../controllers/api/login');

var router = express.Router();



router.post('/login', function (req, res) {
    login.check(req, res);
});

module.exports = router;