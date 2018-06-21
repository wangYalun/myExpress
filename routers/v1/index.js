var express = require('express');

var router = express.Router();

var logger = require('../../log').logger("cheese");

router.get('/manage/message/list', function (req, res) {
    logger.debug(req.query);
    logger.info(req.query);
    res.json(req.query);
});

router.post("/manage/message", function (req, res) {
    logger.debug(req.body);
    res.json(req.body);
});

router.post("/manage/message/json", function (req, res) {
    console.log(req.body)
    console.log(typeof req.body)
    res.send(req.body);
})

module.exports = router;