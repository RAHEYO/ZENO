use zeno;

CREATE TABLE channels (
	id bigint unsigned auto_increment primary key,
    space_id bigint unsigned,
    name varchar(32),
    description varchar(100),
    category ENUM('Chat', 'Board')
);



alter table channels ADD COLUMN description varchar(100) after name;

DESCRIBE channels;

drop table channels;

SELECT * FROM channels;