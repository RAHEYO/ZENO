USE zeno;

CREATE TABLE users (
	id bigint unsigned auto_increment primary key,
    email varchar(64) NOT NULL,
    domain varchar(64) as (SUBSTRING_INDEX(email, "@", -1)) NOT NULL,
    space bigint not null,
	first varchar(64),
    last varchar(64),
    age tinyint unsigned,
	username varchar(64),
    pic VARCHAR(2083),
    created_at timestamp default current_timestamp,
    type ENUM('free', 'pro', 'admin')
);

DESCRIBE users;

explain select * from users 
where username like "ryan%"
order by id asc limit 10;

select * from users;

SELECT id, username, pic FROM users WHERE id IN ();

show indexes from users;

alter table users add column pic VARCHAR(2083);

alter table users add index(username(5));

truncate table users;
