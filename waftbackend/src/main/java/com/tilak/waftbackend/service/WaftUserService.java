package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.LoginRequestDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.exception.AdderNotFoundException;
import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.repository.WaftUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaftUserService {

    private final WaftUserRepo waftUserRepo;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailService customUserDetailService;


    public WaftUserResponseDto addNewUser(Long id,CreateWaftUserRequestDto requestDto) {

        WaftUser adder= waftUserRepo.findById(id).orElseThrow(()->new AdderNotFoundException("User with this id is not found, id: "+id));
        WaftUser newUser= Mapper.toWaftUser(requestDto);
        newUser.setPasswordHash(passwordEncoder.encode(requestDto.getPassword()));

        return Mapper.toWaftUserResponseDto(waftUserRepo.save(newUser));

    }

    public String userLogin(LoginRequestDto loginDto) {

       UserDetails userDetails= customUserDetailService.loadUserByUsername(loginDto.getEmail());

    }
}
