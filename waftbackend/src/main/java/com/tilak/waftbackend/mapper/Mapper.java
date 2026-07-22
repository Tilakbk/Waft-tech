package com.tilak.waftbackend.mapper;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
import com.tilak.waftbackend.model.WaftUser;

public class Mapper {

    public static WaftUser toWaftUser(CreateWaftUserRequestDto requestDto)
    {
        return WaftUser.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .build();
    }

    public static WaftUserResponseDto toWaftUserResponseDto(WaftUser waftUser)
    {
        return WaftUserResponseDto.builder()
                .id(waftUser.getId())
                .name(waftUser.getName())
                .email(waftUser.getEmail())
                .role(waftUser.getRole())
                .isActive(waftUser.getIsActive())
                .createdAt(waftUser.getCreatedAt())
                .build();

    }

    public static WaftUserResponseDto toTeamMemberResponseDto(WaftUser waftUser)
    {
        return WaftUserResponseDto.builder()
                .id(waftUser.getId())
                .name(waftUser.getName())
                .email(waftUser.getEmail())
                .role(waftUser.getRole())
                .isActive(waftUser.getIsActive())
                .createdAt(waftUser.getCreatedAt())
                .photo(waftUser.getPhoto())
                .bio(waftUser.getBio())
                .roleTitle(waftUser.getRoleTitle())
                .build();

    }

}
