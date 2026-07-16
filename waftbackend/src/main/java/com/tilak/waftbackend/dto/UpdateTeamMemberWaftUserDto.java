package com.tilak.waftbackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTeamMemberWaftUserDto {

    @NotBlank(message = "Photo is req")
    private String photo;

    @NotBlank(message = "bio is req")
    private String bio;

    @NotBlank(message = "roleTitle is req")
    private String roleTitle;

}
