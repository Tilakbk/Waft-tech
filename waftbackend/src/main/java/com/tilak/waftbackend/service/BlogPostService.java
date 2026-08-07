package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.BlogPostRequestDto;
import com.tilak.waftbackend.dto.request.BlogPostUpdateRequestDto;
import com.tilak.waftbackend.dto.response.BlogPostResponseDto;
import com.tilak.waftbackend.model.WaftUser;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BlogPostService {
    public BlogPostResponseDto addBlogPost(@Valid BlogPostRequestDto requestDto, WaftUser waftUser) {
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
