package com.tilak.waftbackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMemberUpdateRequestDto {

    private String name;
    private String photo;
    private String bio;
    private String roleTitle;
}