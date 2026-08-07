package com.tilak.waftbackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPostUpdateRequestDto {
    private String title;
    private String category;
    private String coverImageUrl;
    private String excerpt;
    private String content;
}