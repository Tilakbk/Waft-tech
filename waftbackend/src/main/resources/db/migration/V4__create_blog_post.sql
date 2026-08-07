CREATE TABLE blog_post(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(200) NOT NULL ,
    title VARCHAR(200) NOT NULL ,
    category VARCHAR(100),
    cover_image_url VARCHAR(500),
    excerpt VARCHAR(300),
    content TEXT,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    author_id BIGINT NOT NULL ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_blog_post_slug UNIQUE (slug),
    CONSTRAINT fk_blog_creator FOREIGN KEY (author_id) REFERENCES waft_user(id) ON DELETE RESTRICT



)