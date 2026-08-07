package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.BlogPostRequestDto;
import com.tilak.waftbackend.dto.request.BlogPostUpdateRequestDto;
import com.tilak.waftbackend.dto.response.BlogPostResponseDto;
import com.tilak.waftbackend.exception.DuplicateSlugException;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.BlogPost;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.BlogPostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BlogPostService {

    private final BlogPostRepo repo;

    @Transactional
    public BlogPostResponseDto addBlogPost( BlogPostRequestDto requestDto, WaftUser waftUser) {

        String slug = generateSlug(requestDto.getTitle());
        if (repo.existsBySlug(slug))
            throw new DuplicateSlugException("A blog post with this slug already exists.");

        BlogPost blogPost= Mapper.toBlogPost(requestDto);
        blogPost.setAuthor(waftUser);
        blogPost.setSlug(generateSlug(slug));
        return Mapper.toBlogPostResponseDto(repo.save(blogPost));
    }

    private String generateSlug(String title) {
        return title.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }


    public Page<BlogPostResponseDto> getAllBlogPostsAdmin(Pageable pageable, WaftUser waftUser) {
        return null;
    }

    public Page<BlogPostResponseDto> getPublishedBlogPosts(String category, Pageable pageable) {
        return null;

    }

    public BlogPostResponseDto getPublishedBlogPostBySlug(String slug) {
        return null;
    }

    public BlogPostResponseDto getBlogPostById(Long id, WaftUser waftUser) {
        return null;
    }

    public BlogPostResponseDto updateBlogPost(Long id, BlogPostUpdateRequestDto requestDto, WaftUser waftUser) {
        return null;
    }

    public BlogPostResponseDto togglePublishStatus(Long id, WaftUser waftUser) {
        return null;
    }

    public void deleteBlogPost(Long id, WaftUser waftUser) {

    }
}
