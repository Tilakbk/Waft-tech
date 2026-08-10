package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.BlogPostRequestDto;
import com.tilak.waftbackend.dto.request.BlogPostUpdateRequestDto;
import com.tilak.waftbackend.dto.response.BlogPostResponseDto;
import com.tilak.waftbackend.enums.Role;
import com.tilak.waftbackend.exception.BlogPostNotFoundException;
import com.tilak.waftbackend.exception.DuplicateSlugException;
import com.tilak.waftbackend.exception.UserNotPermittedException;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.BlogPost;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.BlogPostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

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


    @Transactional(readOnly = true)
    public Page<BlogPostResponseDto> getAllBlogPostsAdmin(Pageable pageable, WaftUser waftUser) {

        Page<BlogPost> blogPosts;
        if (waftUser.getRole()== Role.ADMIN || waftUser.getRole()==Role.HR){
            blogPosts = repo.findAll(pageable);
        }

        else{
            blogPosts = repo.findAllByAuthor_Id(waftUser.getId(),pageable);
        }
        return blogPosts.map(Mapper::toBlogPostResponseDto);
    }

    @Transactional(readOnly = true)
    public Page<BlogPostResponseDto> getPublishedBlogPosts(String category, Pageable pageable) {

        if (category!=null && !category.isBlank()){
            Page<BlogPost> blogPosts=repo.findAllByIsPublishedTrueAndCategoryIgnoreCase(category,pageable);
            return blogPosts.map(Mapper::toBlogPostResponseDto);
        }

        Page<BlogPost> blogPosts= repo.findAllByIsPublishedTrue(pageable);

        return blogPosts.map(Mapper::toBlogPostResponseDto);

    }

    @Transactional(readOnly = true)
    public BlogPostResponseDto getPublishedBlogPostBySlug(String slug) {
        BlogPost blogPost = repo.findBySlug(slug);
        return Mapper.toBlogPostResponseDto(blogPost);
    }


    public BlogPostResponseDto getBlogPostById(Long id, WaftUser waftUser) {
        BlogPost blogPost= repo.findById(id).orElseThrow(()->new BlogPostNotFoundException("Blog post with id: "+id+" not found"));
        return Mapper.toBlogPostResponseDto(blogPost);
    }

    @Transactional
    public BlogPostResponseDto updateBlogPost(Long id, BlogPostUpdateRequestDto requestDto, WaftUser waftUser) {

        BlogPost blogPost = repo.findById(id).orElseThrow(() -> new BlogPostNotFoundException("Blog post with id: " + id + " not found"));

        if (!blogPost.getAuthor().getId().equals(waftUser.getId())) {
            throw new UserNotPermittedException("You can only update your own blog posts.");
        }

        if (requestDto.getTitle() != null) {
            if (requestDto.getTitle().isBlank()) {
                throw new IllegalArgumentException("Title cannot be blank");
            }
            String newSlug = generateSlug(requestDto.getTitle());
            if (repo.existsBySlugAndIdNot(newSlug, id)) {
                throw new DuplicateSlugException("The slug for the provided title already exists");
            }
            blogPost.setTitle(requestDto.getTitle());
            blogPost.setSlug(newSlug);
        }

        if (requestDto.getCategory() != null && !requestDto.getCategory().isBlank())
            blogPost.setCategory(requestDto.getCategory());

        if (requestDto.getContent() != null && !requestDto.getContent().isBlank())
            blogPost.setContent(requestDto.getContent());

        if (requestDto.getCoverImageUrl() != null && !requestDto.getCoverImageUrl().isBlank())
            blogPost.setCoverImageUrl(requestDto.getCoverImageUrl());

        if (requestDto.getExcerpt() != null && !requestDto.getExcerpt().isBlank())
            blogPost.setExcerpt(requestDto.getExcerpt());

        return Mapper.toBlogPostResponseDto(repo.save(blogPost));
    }

    @Transactional
    public BlogPostResponseDto togglePublishStatus(Long id, WaftUser waftUser) {

        BlogPost blogPost = repo.findById(id).orElseThrow(() -> new BlogPostNotFoundException("Blog post with id: " + id + " not found"));
        blogPost.setIsPublished(!blogPost.getIsPublished());
        return Mapper.toBlogPostResponseDto(repo.save(blogPost));
    }

    @Transactional
    public void deleteBlogPost(Long id, WaftUser waftUser) {
        BlogPost blogPost = repo.findById(id).orElseThrow(() -> new BlogPostNotFoundException("Blog post with id: " + id + " not found"));
        if (!blogPost.getAuthor().getId().equals(waftUser.getId())) {
            throw new UserNotPermittedException("You can only delete your own blog posts.");
        }
        repo.delete(blogPost);
    }
}
