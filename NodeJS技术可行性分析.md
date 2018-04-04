#### NodeJS 技术可行性分析

> 本项目是在 Express 基础上搭建一个项目，采用 routers->controllers->models 的项目结构。 

> 在routers 目录中做好 路由配置

```
// routers/v1/index.js
var express = require('express');

var router = express.Router();

var logger = require('../../index').logger("cheese");
//get 请求
router.get('/manage/message/list', function (req, res) {
    logger.debug(req.query);
    logger.info(req.query);
    res.json(req.query);
});
//post 请求
router.post("/manage/message", function (req, res) {
    logger.debug(req.body);
    res.json(req.body);
})

module.exports = router;
```
> 在 index.js 中设置好匹配路径
```
//index.js
var v1 = require('./routers/v1/index');
app.use('/v1', v1);
```
> 然后请求路径为 http://mydomain.com/v1/manage/message

> 在控制器中(controllers)增加业务逻辑代码

> 在 models 中增加数据模型层

> 访问数据库(lib/db.js)

> 访问Redis(lib/redis.js)
```
var redisClient = require("./lib/redis.js");

redisClient.command("get key").then(function(res){console.log(res)});
```

> 日志系统(index.js->log4js)

> 发送邮件(utils/mail.js)

> 基础测试(test/*.js)


> 线上部署

> NodeJS集群

> 性能分析
