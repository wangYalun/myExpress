优点BUS NodeJS 后端服务(测试阶段)

### 安装
```
    $ npm install
```

### 运行
```
    //调试时用npm run start ,
    $ npm run start
    或者
    $ npm run test
```
### 测试环境部署

```

```

### 配置信息
```
    //数据库连接配置，然后修改里面的配置
    $ cp ./config/database.default.js ./config/database.js
    //邮件发送配置，然后修改里面的配置
    $ cp ./config/email.default.js ./config/database.js
```
### 登录验证

http请求方式：post
url:{server}/api/login

参数说明

参数 | 是否必须 | 说明
---|---
username | 是 | 用户名
password | 是 | 密码

返回说明
```
{
  "code": 200,
  "msg": "success",
  "data": {
    "username": "18600699358",
    "login_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxODYwMDY5OTM1OCIsImlhdCI6MTUwNDIzNjM5MywiZXhwIjoxNTA0MzIyNzkzfQ.fcJMxai1u9fPy0frKATU79Mb5GjafwKUwHrryeCesJ0"
  }
}
```
### 如何发送login_token
```
//可以放到url 查询字符串上
http://{server}/api/line/commute?login_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxODYwMDY5OTM1OCIsImlhdCI6MTUwNDIzNjM5MywiZXhwIjoxNTA0MzIyNzkzfQ.fcJMxai1u9fPy0frKATU79Mb5GjafwKUwHrryeCesJ0
//可以放到请求的header 中
//JavaScript jQuery Ajax
 var obj={
     url:'{server}/api/line/commute'
     method:'get',
     data:{size:10,index:0},
     headers:{'login_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxODYwMDY5OTM1OCIsImlhdCI6MTUwNDIzNjM5MywiZXhwIjoxNTA0MzIyNzkzfQ.fcJMxai1u9fPy0frKATU79Mb5GjafwKUwHrryeCesJ0'}
 }
 $.ajax(obj);
```

 
### 代码编写

##### 目录说明

- [routers]()
>路由文件放在该目录下面，参考[api_test.js]() 书写形式

- [controllers]()
>控制器类放在该目录下面
```
    控制器有个基类，提供了一些基本的方法，包括查询参数验证，统一返回数据格式方法
```

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
