package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogPostRepo extends JpaRepository<BlogPost,Long> {
    boolean existsBySlug(String slug);

    boolean existsByAuthor_Id(Long authorId);
}
