package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.LoginRequestDto;
import com.tilak.waftbackend.dto.response.LoginResponseDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.service.WaftUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for user login and hierarchical account registration (Admin creates HR, HR creates Team Members)")
@RequiredArgsConstructor
public class WaftUserController {

    private final WaftUserService waftUserService;

    @Operation(
            summary = "Register a new staff account",
            description = "Creates a new HR or Team Member account. Requires an authenticated ADMIN "
                    + "(who may only create HR accounts) or HR (who may only create Team Member accounts). "
                    + "The creator's identity is derived from the JWT, not from any client-supplied value."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Account created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed on request body"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not permitted to create an account with the requested role"),
            @ApiResponse(responseCode = "404", description = "Authenticated user (adder) not found")})
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @PostMapping("/register")
    public ResponseEntity<WaftUserResponseDto> addNewUser(@Valid @RequestBody CreateWaftUserRequestDto requestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(waftUserService.addNewUser(principal.getWaftUser().getId(), requestDto));
    }

    @Operation(
            summary = "Log in",
            description = "Authenticates a staff user by email and password, returning a signed JWT "
                    + "to be used as a Bearer token on subsequent requests."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Login successful, JWT returned"),
            @ApiResponse(responseCode = "401", description = "Invalid email or password"),
            @ApiResponse(responseCode = "400", description = "Validation failed on request body")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> userLogin(@Valid @RequestBody LoginRequestDto loginDto){

        return ResponseEntity.ok(waftUserService.userLogin(loginDto));

    }

}
