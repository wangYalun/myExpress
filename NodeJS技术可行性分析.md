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
- 日志级别 DEBUG>INFO>WARN>ERROR>FATAL
- 日志系统使用 log4j ,在log.js 中分了三种打印日志的方式，访问日志，文本日志，控制台日志
- 需要用到哪种日志就引用哪种
```
//访问日志
var logger=require("./log.js").logger("access"); 
//文本日志
var logger=require("./log.js").logger("file");
//控制台日志（默认）
var logger=require("./log.js").logger();

//文本日志和访问日志默认是INFO 级别，可以修改 log.js 中的配置
//控制台日志 开发环境和测试环境下是DEBUG，生产环境是INFO

logger.debug("this is DEBUG level~");  //
logger.info("this is info level~");
logger.warn("this is info level~");
logger.err("this is info level~");
logger.fatal("this is info level~");

```

> 发送邮件(utils/mail.js)

> 基础测试(test/*.js)
- 基础测试在里面

> 线上部署
```
//Linux 下载安装 NodeJS
$ wget https://npm.taobao.org/mirrors/node/v10.4.1/node-v10.4.1-linux-x64.tar.xz
//解压
$ tar xvJf node.xxxx.xz
//设置环境变量
$ vim /etc/profile
#set for nodejs  
export NODE_HOME=/usr/local/node  
export PATH=$NODE_HOME/bin:$PATH 

$ source /etc/profile
$ node -v //查看
//拉取代码

```

> 性能分析
- 简单的压力测试
```
$ .\ab.exe -c 10 -n 1000 http://localhost:8081/ydbus_node/api_v1/manage/message/lis
t?name=allen
```
