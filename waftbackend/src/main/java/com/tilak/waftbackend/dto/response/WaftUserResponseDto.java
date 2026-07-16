package com.tilak.waftbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class WaftUserResponseDto {

    private Long id;
    private String name;
    private String email;
    private String role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private String createdBy;

    private String photo;
    private String bio;
    private String roleTitle;

}
