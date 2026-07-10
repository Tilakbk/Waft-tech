CREATE TABLE waft_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM ('ADMIN','HR','TEAM_MEMBER') NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    photo VARCHAR(500),
    bio TEXT,
    role_title VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by_id BIGINT,

    CONSTRAINT unique_user_email UNIQUE (email),
    CONSTRAINT self_foreign_key FOREIGN KEY (created_by_id) REFERENCES waft_user(id) ON DELETE RESTRICT

)