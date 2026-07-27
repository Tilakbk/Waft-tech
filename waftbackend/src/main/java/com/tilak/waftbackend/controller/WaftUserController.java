package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.LoginRequestDto;
import com.tilak.waftbackend.dto.request.TeamMemberRequestDto;
import com.tilak.waftbackend.dto.response.LoginResponseDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.service.CustomUserDetailService;
import com.tilak.waftbackend.service.WaftUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for user login and hierarchical account registration (Admin creates HR, HR creates Team Members)")
@RequiredArgsConstructor
public class WaftUserController {

    private final WaftUserService waftUserService;
    private final CustomUserDetailService customUserDetailService;

    @Value("${jwt.expiration}")
    private Long jwtExp;

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
            @ApiResponse(responseCode = "200", description = "Login successful, JWT returned in browser cookie"),
            @ApiResponse(responseCode = "401", description = "Invalid email or password"),
            @ApiResponse(responseCode = "400", description = "Validation failed on request body")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> userLogin(
            @Valid @RequestBody LoginRequestDto loginDto,
            HttpServletResponse response) {

        String token = waftUserService.userLogin(loginDto);
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMillis(jwtExp))
                .secure(false) // will set true in prod
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        // Getting user info to return in body
        PrincipalUser principal = (PrincipalUser)
                customUserDetailService.loadUserByUsername(loginDto.getEmail());

        LoginResponseDto responseDto = LoginResponseDto.builder()
                .fullName(principal.getWaftUser().getName())
                .role(principal.getWaftUser().getRole().name())
                .userId(principal.getWaftUser().getId())
                .build();

        return ResponseEntity.ok(responseDto);
    }

    @Operation(
            summary = "Log out",
            description = "Clears the JWT cookie, effectively logging out the authenticated user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Logout successful, JWT cookie cleared"),
            @ApiResponse(responseCode = "401", description = "User is not authenticated")
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .secure(false)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }


    @GetMapping("/me")
    public ResponseEntity<LoginResponseDto> getCurrentUser(Authentication authentication) {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(Mapper.toResponseDtoForTeamMember(principal.getWaftUser()));
    }

    @Operation(
            summary = "Complete Team Member profile",
            description = "Allows an authenticated TEAM_MEMBER to fill in their public-facing "
                    + "profile fields (photo, bio, role title). Restricted to TEAM_MEMBER role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Profile updated successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed on request body"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "User is not a TEAM_MEMBER")
    })
    @PreAuthorize("hasRole('TEAM_MEMBER')")
    @PutMapping("/profile")
    public ResponseEntity<LoginResponseDto> teamMemberProfileUpdate(@Valid @RequestBody TeamMemberRequestDto teamMemberRequestDto,Authentication authentication){
        PrincipalUser principal= (PrincipalUser) authentication.getPrincipal();
        WaftUser user= principal.getWaftUser();

        return ResponseEntity.ok(waftUserService.teamMemberProfileUpdate(user.getId(),teamMemberRequestDto));

    }


}
