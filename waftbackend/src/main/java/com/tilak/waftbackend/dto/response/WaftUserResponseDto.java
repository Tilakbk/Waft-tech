package com.tilak.waftbackend.dto.response;

import com.tilak.waftbackend.enums.Role;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class WaftUserResponseDto {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private Boolean isActive;
    private LocalDateTime createdAt;

    private String photo;
    private String bio;
    private String roleTitle;

}
