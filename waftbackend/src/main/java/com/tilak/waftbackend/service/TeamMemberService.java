package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.TeamMemberUpdateRequestDto;
import com.tilak.waftbackend.dto.response.TeamMemberResponseDto;
import com.tilak.waftbackend.enums.Role;
import com.tilak.waftbackend.exception.TeamMemberHasBlogPostsException;
import com.tilak.waftbackend.exception.TeamMemberNotFoundException;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.BlogPost;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.BlogPostRepo;
import com.tilak.waftbackend.repository.WaftUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TeamMemberService {
    private final WaftUserRepo waftUserRepo;
    private final BlogPostRepo blogPostRepo;
    public List<TeamMemberResponseDto> getAllTeamMember() {

        List<WaftUser> waftUsers= waftUserRepo.findAllByRole(Role.TEAM_MEMBER);
       return waftUsers.stream()
                .map(Mapper::toTeamMemberResponseDto)
                .toList();
    }

    @Transactional
    public List<TeamMemberResponseDto> getAllActiveTeamMember() {
        List<WaftUser> waftUsers= waftUserRepo.findAllByRoleAndIsActiveTrueAndPhotoIsNotNull(Role.TEAM_MEMBER);
        return waftUsers.stream()
                .map(Mapper::toTeamMemberResponseDto)
                .toList();
    }

    @Transactional
    public TeamMemberResponseDto getTeamMemberById(Long id) {

        return Mapper.toTeamMemberResponseDto(waftUserRepo.findById(id).orElseThrow(()->new TeamMemberNotFoundException("Member with "+id+" is not found")));

    }

    @Transactional
    public TeamMemberResponseDto updateTeamMember(Long id, TeamMemberUpdateRequestDto requestDto) {

        WaftUser teamMember = waftUserRepo.findById(id)
                .orElseThrow(() -> new TeamMemberNotFoundException("Member with id " + id + " is not found"));

        if (teamMember.getRole() != Role.TEAM_MEMBER) {
            throw new TeamMemberNotFoundException("User with id " + id + " is not a team member");
        }

        if (requestDto.getName() != null) {
            if (requestDto.getName().isBlank()) {
                throw new IllegalArgumentException("Name cannot be blank");
            }
            teamMember.setName(requestDto.getName());
        }

        if (requestDto.getPhoto() != null)
            teamMember.setPhoto(requestDto.getPhoto());

        if (requestDto.getBio() != null)
            teamMember.setBio(requestDto.getBio());

        if (requestDto.getRoleTitle() != null)
            teamMember.setRoleTitle(requestDto.getRoleTitle());

        return Mapper.toTeamMemberResponseDto(waftUserRepo.save(teamMember));
    }

    @Transactional
    public TeamMemberResponseDto toggleActiveStatus(Long id) {

        WaftUser teamMember = waftUserRepo.findById(id)
                .orElseThrow(() -> new TeamMemberNotFoundException("Member with id " + id + " is not found"));

        if (teamMember.getRole() != Role.TEAM_MEMBER) {
            throw new TeamMemberNotFoundException("User with id " + id + " is not a team member");
        }

        teamMember.setIsActive(!teamMember.getIsActive());

        return Mapper.toTeamMemberResponseDto(waftUserRepo.save(teamMember));
    }

    @Transactional
    public void deleteTeamMember(Long id) {
        WaftUser teamMember = waftUserRepo.findById(id)
                .orElseThrow(() -> new TeamMemberNotFoundException("Member with id " + id + " is not found"));

        if (teamMember.getRole() != Role.TEAM_MEMBER) {
            throw new TeamMemberNotFoundException("User with id " + id + " is not a team member");
        }
        if (blogPostRepo.existsByAuthor_Id(id)){
            throw new TeamMemberHasBlogPostsException("This team member has authored blog, try deactivating instead");
        }

        waftUserRepo.delete(teamMember);
    }
}
