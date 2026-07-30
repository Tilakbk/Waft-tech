package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long> {
    boolean existsBySlug(String slug);
    Page<Project> findByIsPublishedTrue(Pageable pageable);
}
