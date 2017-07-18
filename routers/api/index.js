
var express = require('express');

var router = express.Router();

var selecter = require('../../controllers/api/selecter');

var line = require('../../controllers/api/line/commute');

var notice = require('../../controllers/api/line/notice');

var reportLine = require('../../controllers/api/report/line');

var apiLogin = require('../../controllers/api_login');

var admin_login_log = require('../../controllers/api/admin_login_log');


var jwt = require('jsonwebtoken');

var auth = require('./auth');



router.post('/login', function (req, res) {
    apiLogin.login(req, res);
});

//router.get('/selecter/today', auth.loginToken, selecter.today);


// router
//     .get('/admin_login_log', auth.loginToken, admin_login_log.getAllorOne)
//     .get('/admin_login_log/search', auth.loginToken, admin_login_log.search)
//     .get('/admin_login_log/:id', auth.loginToken, admin_login_log.getAllorOne)
//     .post('/admin_login_log', auth.loginToken, admin_login_log.new)
//     .put('/admin_login_log/:id', auth.loginToken, admin_login_log.update)
//     .delete('/admin_login_log/:id', auth.loginToken, admin_login_log.delete);

//班车线路
var lineRouterPath = '/line/commute';

router.get(lineRouterPath, line.getCommute)
    .get(lineRouterPath + '/:id', line.getCommuteById)
    .post(lineRouterPath, line.addCommute)
    .put(lineRouterPath + "/:id", line.updateCommute)
// .delete(lineRouterPath, line.delete);

router.get('/notice', notice.getNotice).put('/notice/:id', notice.updateNotice);

//报表统计
var reportRouterPath = "/report/line";
router.get(reportRouterPath, reportLine.getLine)



module.exports = router;
