#### PM2 简单的使用文档

##### Quick Start
- Installation
```
$ npm install -g pm2
//start add add a process to your list
$ pm2 start index.js
//show your list
$ pm2 ls
//stop and delete a process from the list
$ pm2 delete app
// stop the process (kill the process but keep it in the process list)
$ pm2 stop app
//start the process
$ pm2 start app
//both stop and start
$ pm2 restart app

//Access your logs in realtime 
$ pm2 logs app

//Clusterize
//To start in cluster mode, pass the -i option followed by the number of clusters that you want
$ pm2 start app -i 4

//use the --help flag to get more informations
$ pm2 restart -h
```

##### Overview
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