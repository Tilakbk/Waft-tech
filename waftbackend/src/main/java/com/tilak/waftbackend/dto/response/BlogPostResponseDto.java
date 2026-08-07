package com.tilak.waftbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPostResponseDto {

    private Long id;
    private String slug;
    private String title;
    private String category;
    private String coverImageUrl;
    private String excerpt;
    private String content;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String authorName;
}