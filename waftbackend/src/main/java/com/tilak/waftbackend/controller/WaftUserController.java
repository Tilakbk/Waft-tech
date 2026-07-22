package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.LoginRequestDto;
import com.tilak.waftbackend.dto.response.LoginResponseDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.service.WaftUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class WaftUserController {

    private final WaftUserService waftUserService;

    @PreAuthorize("hasRole('ADMIN ' || 'HR')")
    @PostMapping("/register/${adderId}")
    public ResponseEntity<WaftUserResponseDto> addNewUser(@PathVariable Long id, @Valid @RequestBody CreateWaftUserRequestDto requestDto)
    {
        return ResponseEntity.ok(waftUserService.addNewUser( id,requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> userLogin(@Valid @RequestBody LoginRequestDto loginDto){

        return ResponseEntity.ok(waftUserService.userLogin(loginDto));

    }

}
