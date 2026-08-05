package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.response.TeamMemberResponseDto;

import com.tilak.waftbackend.service.TeamMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Team Member", description = "Endpoints for managing Waft Tech team members. Public listing requires no auth. Create, update, delete restricted to HR role.")

public class TeamMemberController {

    private final TeamMemberService teamMemberService;


    @Operation(summary = "Get all team members (admin)", description = "Returns all team members including inactive ones. Requires authentication.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Team members retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT")
    })
    @GetMapping("/team/admin")
    public ResponseEntity<List<TeamMemberResponseDto>> getAllTeamMember(){
        return ResponseEntity.ok(teamMemberService.getAllTeamMember());
    }

    @Operation(summary = "Get active team members", description = "Returns all active team members with complete profiles. Public endpoint, no authentication required.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Team members retrieved successfully")
    })
    @GetMapping("/team")
    public ResponseEntity<List<TeamMemberResponseDto>> getAllActiveTeamMember(){
        return ResponseEntity.ok(teamMemberService.getAllActiveTeamMember());
    }

    @GetMapping("/team/admin/{id}")
    public ResponseEntity<TeamMemberResponseDto> getTeamMemberById(@PathVariable Long id){
        return ResponseEntity.ok(teamMemberService.getTeamMemberById(id));
    }

}
