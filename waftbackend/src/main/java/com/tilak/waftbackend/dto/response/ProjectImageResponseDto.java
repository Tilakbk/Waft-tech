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
public class ProjectImageResponseDto {
    private Long id;
    private String image;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private String projectName;
}
