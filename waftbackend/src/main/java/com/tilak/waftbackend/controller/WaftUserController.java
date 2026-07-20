package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.service.WaftUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class WaftUserController {

    private final WaftUserService waftUserService;

    @PostMapping("/register")
    public ResponseEntity<WaftUserResponseDto> addNewUser(@Valid @RequestBody CreateWaftUserRequestDto requestDto)
    {
        return ResponseEntity.ok(waftUserService.addNewUser(requestDto));
    }


}
