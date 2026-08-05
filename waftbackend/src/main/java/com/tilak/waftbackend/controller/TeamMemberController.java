package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.response.TeamMemberResponseDto;

import com.tilak.waftbackend.service.TeamMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    @GetMapping("/team")
    public ResponseEntity<TeamMemberResponseDto> getAllTeamMember(){
        return null;
    }

}
