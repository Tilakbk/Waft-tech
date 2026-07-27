package com.tilak.waftbackend.dto.response;

import lombok.*;

import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDto {
    private String role;
    private String fullName;
    private Long userId;
    private String photo;
    private String bio;
    private String roleTitle;

}
