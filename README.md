NodeJS 后端服务

### 安装
<pre>
    $ npm install
</pre>

### 运行
<pre>
    $ npm start
    或者
    $ npm test
</pre>
 
### 代码编写

##### 目录说明

- [routers]()
>路由文件放在该目录下面，参考[api_test.js]() 书写形式

- [controllers]()
>控制器类放在该目录下面
<pre>
    控制器有个基类，提供了一些基本的方法，包括查询参数验证，统一返回数据格式方法
    例如：
    var admin = require('../models/admin');
    var apibase = require('./api_base');
    var jwt = require('jsonwebtoken');

    var apiLogin = Object.create(apibase);

    apiLogin.login = function (req, res) {}

    module.exports = apiLogin;
</pre>

- [models]()
> 模型层代码放在该目录下

- [utils]()
> 工具类
- [db.js]() 数据库类 
- [mail.js]() 发送邮件类

- [uploads]()
> 上传文件的文件夹

- [public]()
> 静态文件夹

- [config]()
> 配置文件夹

- [cli]()
> 执行文件

- [database]()
> 数据库文件