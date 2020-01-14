drop database if exists blogBrunella;
create database blogBrunella;
use blogBrunella;

create table `user`(
   id int auto_increment primary key,
   `name` varchar(50) not null,
   `password` varchar(50) not null  
) engine = InnoDB;

insert `user`(`name`,`password`) values("brunella","brunella");

create table `events`(
   id_event int auto_increment primary key,
   date_create datetime default now(),
   path_image varchar(500) not null,
   title_event varchar(300) not null,
   text_event varchar(500) not null
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
   foreign key(id_publication) references publications(id_publication) on delete cascade on update cascade,
   foreign key(id_comment) references comments(id_comment) on delete cascade on update cascade
) engine = InnoDB;

<<<<<<< HEAD
=======

create table events(
   id_event int auto_increment primary key,
   date_create datetime default now(),
   path_image varchar(500) not null,
   title_event varchar(300) not null,
   text_event varchar(2000) not null
) engine = InnoDB;

>>>>>>> c8a9caec7f7b269e9cf31f8adb5c5f2cbec64f73
create view UsersComments as
	select date_comment,username_comment,text_comment, id_publication from comments inner join posts 
    on comments.id_comment = posts.id_comment order by date_comment desc;
    
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
create procedure InsertEvent(pathImage varchar(500),title varchar(300), textE varchar(2000))
begin
	insert events(path_image,title_event,text_event) values(pathImage,title,textE);
end//
delimiter ;


delimiter //
create procedure InsertPublication(pathImage varchar(500),title varchar(300), textP varchar(2000))
begin
	insert publications(path_image,title_publication,text_publication) values(pathImage,title,textP);
end//
delimiter ;

<<<<<<< HEAD
delimiter //
create procedure InsertEvent(pathImage varchar(500),title varchar(300), textE varchar(2000))
begin
	insert `events`(path_image,title_event,text_event) values(pathImage,title,textE);
end//
delimiter ;

call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Event","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
=======

call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
>>>>>>> c8a9caec7f7b269e9cf31f8adb5c5f2cbec64f73
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertPublication("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
 

call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento a","a Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento b","b Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento c","c Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento d","d Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");

