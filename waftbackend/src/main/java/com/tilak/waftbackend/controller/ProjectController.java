package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.ProjectRequestDto;
import com.tilak.waftbackend.dto.response.ProjectResponseDto;
import com.tilak.waftbackend.repository.ProjectRepo;
import com.tilak.waftbackend.service.ProjectService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Project", description = "Endpoints for completed project by waft-tech, can only be added by an Admin ")
public class ProjectController {

    private final ProjectService projectService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/projects")
    public ResponseEntity<ProjectResponseDto> addProjects(@Valid @RequestBody ProjectRequestDto projectRequestDto){
        return null;

    }


}
