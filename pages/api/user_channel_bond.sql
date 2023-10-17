use zeno;

CREATE TABLE user_channel_bonds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    channel_id BIGINT NOT NULL,
    permissions JSON
);


SELECT * FROM user_channel_bonds;