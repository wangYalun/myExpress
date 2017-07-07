--数据后台 数据库

create database `db_repository_1` default character set utf8 collate utf8_general_ci;

use db_repository_1;

--数据后台用户表

create table `admin_user`(
    `uid` int unsigned not null auto_increment comment '数据后台用户ID,自增',
    `email` varchar(100) not null comment '用户邮箱,用户通过邮箱注册',
    `mobile_phone` varchar(11) not null default '' comment '用户手机号码',
    `password` char(32) not null comment '用户密码',
    `nickname` varchar(50) not null default '' comment '', 
    `create_time` timestamp not null DEFAULT CURRENT_TIMESTAMP comment '注册时间',
    `flag` char(1) not null default 'Y' comment '账号是否禁用',
    `update_time` timestamp not null ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
    primary key(`uid`),
    unique key `email_key`(`email`)
)engine=InnoDB default charset=utf8;

--测试数据
insert into `admin_user`(email,mobile_phone,password,nickname) 
values('326402399@qq.com','18600699358',md5('18942339954wang'),'卡卡罗特伦');

--数据后台用户登录表
create table `admin_login_log`(
    `id` int unsigned not null auto_increment comment '自增ID',
    `login_uid` int unsigned not null comment '登录用户ID',
    `login_time` timestamp not null comment '登录时间',
    `device_info` varchar(100) not null default '' comment '登录设备信息',
    primary key(`id`)
)engine=InnoDB default charset=utf8;

--邮箱验证码表
create table `admin_login_captcha`(
    `id` int unsigned not null auto_increment comment '自增ID',
    `email` varchar(100) not null comment '待验证邮箱号',
    `captcha_code` char(4) not null comment '随机生成的验证码',
    `server_time` timestamp not null comment '验证生成时间',
    `is_success` char(1) not null default 'N' comment '是否验证成功',
    `success_time` timestamp not null DEFAULT CURRENT_TIMESTAMP comment '验证成功时间',
    primary key(`id`)
)engine=InnoDB default charset=utf8;


