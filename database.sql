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
   path_image varchar(500) not null,
   title_publication varchar(300) not null,
   text_publication varchar(2000) not null
) engine = InnoDB;

create table comments(
   id_comment int auto_increment primary key,
   date_comment datetime default now(),
   username_comment varchar(40),
   user_mail_comment varchar(100),
   text_comment varchar(200)
) engine = InnoDB;

create table posts(
   id int auto_increment primary key,
   id_publication int not null,
   id_comment int not null,
   foreign key(id_publication) references publications(id_publication),
   foreign key(id_comment) references comments(id_comment)
) engine = InnoDB;

create view UsersComments
as
	select date_comment,username_comment,text_comment from comments;

delimiter //
create procedure InsertComment(idPublication int,userC varchar(40),mail varchar(100),textC varchar(200))
begin
   declare idExists int default (select count(*) from publications where id_publication = idPublication);
   declare idComment int default 0;

   if idExists > 0
   then
      insert comments(username_comment,user_mail_comment,text_comment) values(userC,mail,textC);
      set idComment = (select max(id_comment) from comments where username_comment = userC);
      insert posts (id_publication,id_comment) values(idPublication,idComment);
   end if;
end//
delimiter ; 

delimiter //
create procedure InsertPublication(pathImage varchar(500),title varchar(300), textP varchar(2000))
begin
	insert publications(path_image,title_publication,text_publication) values(pathImage,title,textP);
end//
delimiter ;