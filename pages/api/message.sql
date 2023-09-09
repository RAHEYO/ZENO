use zeno;

CREATE TABLE messages (
	id bigint auto_increment primary key,
    channel_id bigint NOT NULL,
    sender bigint NOT NULL,
    content text NOT NULL,
    sent_time timestamp NOT NULL,
    index(channel_id),
    fulltext (content)
);

ALTER TABLE messages add fulltext index(content);

DESCRIBE messages;

show indexes from messages;

explain SELECT * FROM messages;
explain format=tree SELECT * FROM messges;
