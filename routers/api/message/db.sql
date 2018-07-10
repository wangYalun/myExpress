--数据后台 数据库

create database `db_message_board` default character set utf8 collate utf8_general_ci;

use db_message_board;

--留言板

create table `mb_message`(
    `id` int unsigned not null auto_increment,
    `name` varchar(100) not null comment '名字',
    `phone_num` varchar(11) not null default '' comment '用户手机号码',
    `content` varchar(1024) not null default '' comment '留言内容',
    `create_time` timestamp not null DEFAULT CURRENT_TIMESTAMP comment '留言时间',
    primary key(`id`)
)engine=InnoDB default charset=utf8;
