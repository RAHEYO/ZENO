USE zeno;

CREATE TABLE spaces (
    id bigint auto_increment primary key,
    name varchar(32) not null,
    profile_pic text,
    settings JSON
);

explain select * from spaces;

show indexes from spaces;
