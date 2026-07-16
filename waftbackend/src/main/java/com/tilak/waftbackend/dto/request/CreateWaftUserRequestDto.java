package com.tilak.waftbackend.dto.request;

import com.tilak.waftbackend.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateWaftUserRequestDto {

    @NotBlank(message = "Name is mandatory")
    private String name;

    @Email(message = "email format must match")
    @NotBlank(message = "email should be provided")
    private String email;

    @NotBlank(message = "password is must")
    private String password;

    @NotBlank(message = "Role is must")
    private Role role;



}
