package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.model.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectImageRepo extends JpaRepository<ProjectImage,Long> {

    @Query("SELECT MAX(pi.sortOrder) FROM ProjectImage pi WHERE pi.project.id = :projectId")
    Optional<Long> findMaxSortOrderByProjectId(@Param("projectId") Long projectId);

    @Query("SELECT pi FROM ProjectImage pi WHERE pi.project.id = :projectId ORDER BY pi.sortOrder ASC")
    List<ProjectImage> findByProject_IdOrderBySortOrderAsc(@Param("projectId") Long projectId);
}
