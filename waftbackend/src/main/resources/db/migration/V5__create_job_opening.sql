
CREATE TABLE job_opening(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL ,
    department VARCHAR(100) ,
    location VARCHAR(150) ,
    type VARCHAR(50) ,
    remote BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT ,
    responsibilities JSON,
    requirements JSON,
    is_open BOOLEAN NOT NULL DEFAULT TRUE,
    posted_by_id BIGINT NOT NULL ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_posted_by FOREIGN KEY (posted_by_id) REFERENCES waft_user(id) ON DELETE RESTRICT
)