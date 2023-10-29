USE zeno;

CREATE TABLE spaces (
    id bigint unsigned auto_increment primary key,
    name varchar(32) not null,
    profile_pic text,
    default_channel bigint unsigned,
    roles json
);

select * from spaces;

update spaces
set default_channel = 12 where id = 5;

select * from spaces
where id in (
	select * from role_relations
);

alter table spaces add column roles json;

truncate table spaces;

show indexes from spaces;
