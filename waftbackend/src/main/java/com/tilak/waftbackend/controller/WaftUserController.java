package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.LoginRequestDto;
import com.tilak.waftbackend.dto.response.LoginResponseDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.service.WaftUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class WaftUserController {

    private final WaftUserService waftUserService;

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @PostMapping("/register")
    public ResponseEntity<WaftUserResponseDto> addNewUser(@Valid @RequestBody CreateWaftUserRequestDto requestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(waftUserService.addNewUser(principal.getWaftUser().getId(), requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> userLogin(@Valid @RequestBody LoginRequestDto loginDto){

        return ResponseEntity.ok(waftUserService.userLogin(loginDto));

    }

}
