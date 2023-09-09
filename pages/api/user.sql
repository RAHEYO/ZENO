USE zeno;

CREATE TABLE users (
	id bigint unsigned auto_increment primary key,
    email varchar(64) NOT NULL,
    domain varchar(64) as (SUBSTRING_INDEX(email, "@", -1)) NOT NULL,
	first varchar(64),
    last varchar(64),
    age tinyint unsigned,
	username varchar(64),
    created_at timestamp default current_timestamp,
    type ENUM('free', 'pro', 'admin')
);

DESCRIBE users;

explain select * from users 
where username like "ryan%"
order by id asc limit 10;

show indexes from users;

alter table users drop index username;

alter table users add index(username(5));
