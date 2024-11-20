create database ;

create table bookdb(
id char(20) primary key,
name varchar(20),
desc varchar(255)
);

insert into book (id,name,desc)
values
(202,x,book);

select * from bookdb;

select * from bookdb
where id=202

delete from bookdb
where id=202

update bookdbset name="www" desc="sdnndafnv"
where id=202;