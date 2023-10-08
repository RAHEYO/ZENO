USE zeno;

CREATE TABLE spaces (
    id bigint unsigned auto_increment primary key,
    name varchar(32) not null,
    profile_pic text,
    default_channel bigint unsigned,
    roles json
);

select * from spaces;

alter table spaces add column roles json;

truncate table spaces;

show indexes from spaces;
