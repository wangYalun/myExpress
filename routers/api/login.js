
var express = require('express');
var login = require('../../controllers/api/login');


var router = express.Router();



router.post('/login', function (req, res) {
    login.check(req, res);
});

router.post('/admin_login', function (req, res) {
    login.getAdminToken(req, res);
});

router.post("/xcx_login", function (req, res) {
    login.xcxLogin(req, res);
});

module.exports = router;