package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long> {
    boolean existsBySlug(String slug);
    Page<Project> findByIsPublishedTrue(Pageable pageable);

    @Query(value = "SELECT * FROM project p WHERE p.is_published = true " +
            "AND p.tags LIKE CONCAT('%\"', :tag, '\"%')"+
            "ORDER BY p.created_at ASC",
            countQuery = "SELECT COUNT(*) FROM project p WHERE p.is_published = true " +
                    "AND p.tags LIKE CONCAT('%\"', :tag, '\"%')",
            nativeQuery = true)
    Page<Project> findByIsPublishedTrueAndTag(@Param("tag") String tag, Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.isPublished=true AND p.slug= :slug")
    Optional<Project> findBySlugAndIsPublishedTrue(@Param("slug") String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);
}
