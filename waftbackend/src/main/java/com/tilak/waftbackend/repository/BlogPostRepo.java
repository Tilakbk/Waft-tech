package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.model.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepo extends JpaRepository<BlogPost,Long> {
    boolean existsBySlug(String slug);

    boolean existsByAuthor_Id(Long authorId);

    Page<BlogPost> findAllByAuthor_Id(Long authorId, Pageable pageable);

    @Query("SELECT b FROM BlogPost b WHERE b.isPublished = true AND LOWER(b.category) = LOWER(:category)")
    Page<BlogPost> findAllByIsPublishedTrueAndCategoryIgnoreCase(@Param("category") String category, Pageable pageable);

    Page<BlogPost> findAllByIsPublishedTrue(Pageable pageable);

    BlogPost findBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);


}
