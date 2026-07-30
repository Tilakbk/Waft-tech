package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.ProjectRequestDto;
import com.tilak.waftbackend.dto.response.ProjectResponseDto;
import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Project", description = "Endpoints for completed project by waft-tech, can only be added by an Admin ")
public class ProjectController {

    private final ProjectService projectService;


    @Operation(
            summary = "Create a new project",
            description = "Adds a new completed project entry to the portfolio. Generates a unique, "
                    + "URL-friendly slug from the title. Restricted to ADMIN role. New projects "
                    + "are published by default unless otherwise configured."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Project created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed on request body"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN"),
            @ApiResponse(responseCode = "409", description = "A project with the generated slug already exists")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/project")
    public ResponseEntity<ProjectResponseDto> addProject(@Valid @RequestBody ProjectRequestDto projectRequestDto, Authentication authentication){
        PrincipalUser user= (PrincipalUser) authentication.getPrincipal();
        WaftUser waftUser= user.getWaftUser();
        return ResponseEntity.ok(projectService.addProject(projectRequestDto, waftUser));

    }

    @Operation(
            summary = "List all projects (admin)",
            description = "Returns a paginated list of every project, including unpublished drafts. "
                    + "Intended for the admin dashboard. Restricted to ADMIN role. Supports standard "
                    + "Spring pagination query params (page, size, sort)."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Projects retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/projects/admin")
    public ResponseEntity<Page<ProjectResponseDto>> getAllProject(@ParameterObject @PageableDefault(size = 12, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable){
        return ResponseEntity.ok(projectService.getAllProject(pageable));
    }

    @Operation(
            summary = "List published projects",
            description = "Returns a paginated list of published projects only. Public endpoint, no "
                    + "authentication required. Intended for the public-facing portfolio page. Supports "
                    + "standard Spring pagination query params (page, size, sort)."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Published projects retrieved successfully")
    })
    @GetMapping("/projects")
    public ResponseEntity<Page<ProjectResponseDto>> getPublishedProject(@ParameterObject @PageableDefault(size = 8,sort = "createdAt", direction = Sort.Direction.ASC)Pageable pageable){
        return ResponseEntity.ok(projectService.getPublishedProject(pageable));
    }



}
