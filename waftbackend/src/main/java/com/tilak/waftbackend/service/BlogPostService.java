package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.BlogPostRequestDto;
import com.tilak.waftbackend.dto.request.BlogPostUpdateRequestDto;
import com.tilak.waftbackend.dto.response.BlogPostResponseDto;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.BlogPost;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.BlogPostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlogPostService {

    private final BlogPostRepo repo;
    public BlogPostResponseDto addBlogPost( BlogPostRequestDto requestDto, WaftUser waftUser) {

        BlogPost blogPost= Mapper.toBlogPost(requestDto);
        blogPost.setAuthor(waftUser);
        blogPost.setSlug(generateSlug(requestDto.getTitle()));
        return Mapper.toBlogPostResponseDto(repo.save(blogPost));
    }

    private String generateSlug(String title) {
        return title.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }

    public Page<BlogPostResponseDto> getAllBlogPostsAdmin(Pageable pageable, WaftUser waftUser) {
    }

    public Page<BlogPostResponseDto> getPublishedBlogPosts(String category, Pageable pageable) {
    }

    public BlogPostResponseDto getPublishedBlogPostBySlug(String slug) {
    }

    public BlogPostResponseDto getBlogPostById(Long id, WaftUser waftUser) {
    }

    public BlogPostResponseDto updateBlogPost(Long id, BlogPostUpdateRequestDto requestDto, WaftUser waftUser) {
    }

    public BlogPostResponseDto togglePublishStatus(Long id, WaftUser waftUser) {
    }

    public void deleteBlogPost(Long id, WaftUser waftUser) {
    }
}
