/**
 * 留言板项目API
 */

var express = require('express');


var c_message = require('../../../controllers/api/message');


var router = express.Router();






// router.get("/search", function (req, res) {
//     var params = req.query;
//     if (params.name) {
//         model.getMessageByName(params.name).then(function (result) {
//             res.json(res);
//         })
//     }
// })

router.get("/search", c_message.getMessageByName)

// router.post("/post", function (req, res) {
//     res.json(req.body);
// })

router.post("/post", c_message.addMessage)

module.exports = router;


