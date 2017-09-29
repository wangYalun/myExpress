
var express = require('express');

var router = express.Router();


var c_weixin = require('../../../controllers/api/weixin');


router.get('/', c_weixin.checkSignature);


module.exports=router;