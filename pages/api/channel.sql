use zeno;

CREATE TABLE channels (
	id bigint auto_increment primary key,
    space_id bigint,
    name varchar(32),
    settings JSON
);


INSERT INTO channels (space_id, settings)
values (1, "{\"accessibility\": \"member\"}");

alter table channels drop COLUMN accessibility;

DESCRIBE channels;

SELECT * FROM channels;