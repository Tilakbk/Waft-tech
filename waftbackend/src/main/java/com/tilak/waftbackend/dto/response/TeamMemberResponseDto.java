package com.tilak.waftbackend.dto.response;
import com.tilak.waftbackend.enums.Role;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class TeamMemberResponseDto {
    private Long id;
    private String name;
    private String photo;
    private String bio;
    private String roleTitle;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
