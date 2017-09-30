
var express = require('express');

var router = express.Router();


var c_weixin = require('../../../controllers/api/weixin');


router.get('/', c_weixin.checkSignature);

router.get('/get-signature', c_weixin.getSignature);


module.exports = router;