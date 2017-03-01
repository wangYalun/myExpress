var express = require('express');

var router = express.Router();

var apiLogin = require('../controllers/api_login');

router.post('/login', function (req, res) {
    apiLogin.login(req, res);
});

module.exports = router;