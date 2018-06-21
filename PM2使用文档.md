#### PM2 简单的使用文档

##### 为什么选择PM2
- Forever Alive
```
$ pm2 start index.js
```
- Process Management
```
$ pm2 ls
```
- Log Management
```
$ pm2 logs <app_name>
//PS 如果需要使用log4js 的日志模块时，需要再log.js 文件中配置pm2:true
```