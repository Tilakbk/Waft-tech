package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.LoginRequestDto;
import com.tilak.waftbackend.dto.request.TeamMemberRequestDto;
import com.tilak.waftbackend.dto.response.LoginResponseDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.enums.Role;
import com.tilak.waftbackend.exception.AdderNotFoundException;
import com.tilak.waftbackend.exception.IllegalStateFoundException;
import com.tilak.waftbackend.exception.UserNotPermittedException;
import com.tilak.waftbackend.jwt.JwtService;
import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.repository.WaftUserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class WaftUserService {

    private final WaftUserRepo waftUserRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Transactional
    public WaftUserResponseDto addNewUser(Long id,CreateWaftUserRequestDto requestDto) {

        WaftUser adder= waftUserRepo.findById(id).orElseThrow(()->new AdderNotFoundException("User with this id is not found, id: "+id));

        if (adder.getRole().name().equals("ADMIN") && requestDto.getRole().name().equals("HR")){
            WaftUser newUser= Mapper.toWaftUser(requestDto);
            newUser.setRole(Role.HR);
            newUser.setPasswordHash(passwordEncoder.encode(requestDto.getPassword()));
            newUser.setCreatedBy(adder);
            return Mapper.toWaftUserResponseDto(waftUserRepo.save(newUser));
        }

        else if (adder.getRole().name().equals("HR") && requestDto.getRole().name().equals("TEAM_MEMBER")){
            WaftUser newUser= Mapper.toWaftUser(requestDto);
            newUser.setRole(Role.TEAM_MEMBER);
            newUser.setPasswordHash(passwordEncoder.encode(requestDto.getPassword()));
            newUser.setCreatedBy(adder);
            return Mapper.toWaftUserResponseDto(waftUserRepo.save(newUser));
        }
        else
            throw new UserNotPermittedException("The user "+ adder.getName() +"with id:"+id+" is not authenticated to perform the action");
    }

    @Transactional(readOnly = true)
    public String userLogin(LoginRequestDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        HashMap<String, Object> extraClaim= new HashMap<>();
        extraClaim.put("role",principal.getWaftUser().getRole().name());
        return jwtService.generateToken(extraClaim,principal);
    }

    public LoginResponseDto teamMemberProfileUpdate(Long id,TeamMemberRequestDto teamMemberRequestDto) {

        WaftUser adder= waftUserRepo.findById(id).orElseThrow(()->new IllegalStateFoundException("User with this id is not found, id: "+id));
        adder.setPhoto(teamMemberRequestDto.getPhoto());
        adder.setBio(teamMemberRequestDto.getBio());
        adder.setRoleTitle(teamMemberRequestDto.getRoleTitle());
        return Mapper.toResponseDtoForTeamMember(waftUserRepo.save(adder));

    }
}
