package com.tilak.waftbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPostRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String category;

    private String coverImageUrl;

    private String excerpt;

    @NotBlank(message = "Content is required")
    private String content;
}