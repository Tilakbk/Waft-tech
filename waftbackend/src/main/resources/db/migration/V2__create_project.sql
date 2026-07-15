
CREATE TABLE project(
    id BIGINT AUTO_INCREMENT PRIMARY KEY  ,
    slug VARCHAR(100) NOT NULL ,
    title varchar(150) NOT NULL ,
    tags JSON,
    thumbnail_url VARCHAR(500),
    hero_image_url VARCHAR(500),
    date DATE,
    brief TEXT,
    problem_statement TEXT,
    solutions JSON,
    results JSON,
    final_thought TEXT,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_by_id BIGINT NOT NULL ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_slug UNIQUE (slug),
    CONSTRAINT project_creator FOREIGN KEY (created_by_id) REFERENCES waft_user(id) ON DELETE RESTRICT

)