to run this project you need to set a database, here are the commands to setup a database
/**********************************/
create database TodoApp;
use TodoApp;
create table user(
	userId int primary key auto_increment,
    email varchar(255) not null unique key,
    username varchar(255),
    password varchar(255),
    security varchar(255)
);
create table todo (
	taskId int primary key auto_increment,
    userId int,
    task varchar(255),
    checked boolean default false,
    constraint forignkeytodo foreign key(userId) references user(userId)
);
