package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.response.TeamMemberResponseDto;
import com.tilak.waftbackend.enums.Role;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.WaftUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TeamMemberService {
    private final WaftUserRepo waftUserRepo;

    public List<TeamMemberResponseDto> getAllTeamMember() {

        List<WaftUser> waftUsers= waftUserRepo.findAllByRole(Role.TEAM_MEMBER);
       return waftUsers.stream()
                .map(Mapper::toTeamMemberResponseDto)
                .toList();
    }

    public List<TeamMemberResponseDto> getAllActiveTeamMember() {
        List<WaftUser> waftUsers= waftUserRepo.findAllByRoleAndIsActiveTrueAndPhotoIsNotNull(Role.TEAM_MEMBER);
        return waftUsers.stream()
                .map(Mapper::toTeamMemberResponseDto)
                .toList();
    }
}
