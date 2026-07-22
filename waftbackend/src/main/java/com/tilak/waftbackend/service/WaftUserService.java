package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.LoginRequestDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.repository.WaftUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaftUserService {

    private final WaftUserRepo waftUserRepo;
    private final PasswordEncoder passwordEncoder;


    public WaftUserResponseDto addNewUser(CreateWaftUserRequestDto requestDto) {


        WaftUser newUser= Mapper.toWaftUser(requestDto);
        newUser.setPasswordHash(passwordEncoder.encode(requestDto.getPassword()));

        return Mapper.toWaftUserResponseDto(waftUserRepo.save(newUser));

    }

    public String userLogin(LoginRequestDto loginDto) {

    }
}
