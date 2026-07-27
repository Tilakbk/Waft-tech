package com.tilak.waftbackend.dto.response;

import com.tilak.waftbackend.record.SolutionItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponseDto {

    private Long id;
    private String slug;
    private String title;
    private List<String> tags;
    private String thumbnailUrl;
    private String heroImageUrl;
    private LocalDate date;
    private String brief;
    private String problemStatement;
    private List<SolutionItem> solutions;
    private List<SolutionItem> results;
    private String finalThought;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdByName;
    private List<String> imageUrls;
}
