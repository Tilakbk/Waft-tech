package com.tilak.waftbackend.dto.response;

import lombok.*;

import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {

    private String token;
    private String role;
    private String fullName;
    private UUID userId;
}
