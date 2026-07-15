CREATE TABLE job_application(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL ,
    email VARCHAR(150) NOT NULL ,
    phone VARCHAR(20),
    current_address VARCHAR(300),
    resume_url VARCHAR(500) NOT NULL ,
    status ENUM('NEW','REVIEWED','HIRED','REJECTED') NOT NULL DEFAULT 'NEW',
    job_opening_id BIGINT NOT NULL ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_opening_id FOREIGN KEY (job_opening_id) REFERENCES job_opening(id) ON DELETE RESTRICT
)