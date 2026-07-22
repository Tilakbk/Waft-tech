package com.tilak.waftbackend.dto.response;

import lombok.*;

import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDto {

    private String token;
    private String role;
    private String fullName;
    private Long userId;
}
