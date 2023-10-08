use zeno;


CREATE TABLE role_relations (
    space_id bigint unsigned,
    role_name varchar(20),
    channel_id bigint unsigned,
    user_id bigint unsigned,
    permissions ENUM('admin', 'write', 'read', 'invisisble') default 'write',
    primary key (space_id, role_name, user_id, channel_id)
);

drop table role_relations;

select * from role_relations;
