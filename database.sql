drop database if exists blogBrunella;
create database blogBrunella;
use blogBrunella;

create table user(
   id int auto_increment primary key,
   `name` varchar(50) not null,
   `password` varchar(50) not null  
) engine = InnoDB;

create table publications(
   id_publication int auto_increment primary key,
   date_create datetime default now(),
   path_image varchar(300) not null,
   title_publication varchar(300) not null,
   text_publication varchar(1000)
) engine = InnoDB;

create table comments(
   id_comment int auto_increment primary key,
   username_comment varchar(40),
   text_comment varchar(200)
) engine = InnoDB;

create table posts(
   id int auto_increment primary key,
   id_publication int not null,
   id_comment int not null,
   foreign key(id_publication) references publications(id_publication),
   foreign key(id_comment) references comments(id_comment)
) engine = InnoDB;