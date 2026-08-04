package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.ProjectImageRequestDto;
import com.tilak.waftbackend.dto.request.ProjectRequestDto;
import com.tilak.waftbackend.dto.request.ProjectUpdateRequestDto;
import com.tilak.waftbackend.dto.response.ProjectImageResponseDto;
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
    public ResponseEntity<Page<ProjectResponseDto>> getPublishedProject(@RequestParam(required = false) String tag,@ParameterObject @PageableDefault(size = 8,sort = "createdAt", direction = Sort.Direction.ASC)Pageable pageable){
        return ResponseEntity.ok(projectService.getPublishedProject(tag,pageable));
    }

    @Operation(
            summary = "Get a published project by slug",
            description = "Returns a single published project by its URL slug. Public endpoint, no "
                    + "authentication required. Unpublished projects and nonexistent slugs both return "
                    + "404, indistinguishably."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Project retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No published project exists with the given slug")
    })
    @GetMapping("/projects/{slug}")
    public ResponseEntity<ProjectResponseDto> getPublishedProjectBySlug(@PathVariable String slug){
        return ResponseEntity.ok(projectService.getPublishedProjectBySlug(slug));
    }

    @Operation(
            summary = "Get any project by ID (admin)",
            description = "Returns a project by its numeric ID regardless of publish status. "
                    + "Intended for the admin edit screen. Restricted to ADMIN role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Project retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN"),
            @ApiResponse(responseCode = "404", description = "No project exists with the given ID")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/projects/admin/{id}")
    public ResponseEntity<ProjectResponseDto> getProjectById(@PathVariable Long id){
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @Operation(
            summary = "Toggle a project's publish status",
            description = "Flips a project between published and unpublished. Restricted to ADMIN role. "
                    + "Calling this repeatedly toggles the state back and forth — there is no separate "
                    + "'publish' vs 'unpublish' endpoint."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Publish status toggled successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN"),
            @ApiResponse(responseCode = "404", description = "No project exists with the given ID")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/projects/{id}/publish")
    public ResponseEntity<ProjectResponseDto> updateProjectPublishStatus(@PathVariable Long id){
        return ResponseEntity.ok(projectService.updateProjectPublishStatus(id));
    }

    @Operation(
            summary = "Partially update a project (admin)",
            description = "Updates one or more fields of a project. Only fields present in the request "
                    + "body are modified — omitted or null fields are left unchanged. If the title is "
                    + "updated, the project's slug is automatically regenerated from the new title. "
                    + "Restricted to ADMIN role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Project updated successfully"),
            @ApiResponse(responseCode = "400", description = "Title was provided but is blank"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN"),
            @ApiResponse(responseCode = "404", description = "No project exists with the given ID"),
            @ApiResponse(responseCode = "409", description = "The regenerated slug collides with another project's slug")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/projects/admin/{id}")
    public ResponseEntity<ProjectResponseDto> updateProject(@PathVariable Long id,@RequestBody ProjectUpdateRequestDto projectUpdateRequestDto){

        return ResponseEntity.ok(projectService.updateProject(id,projectUpdateRequestDto));

    }

    @Operation(
            summary = "Delete a project (admin)",
            description = "Permanently deletes a project and its associated images. This action cannot "
                    + "be undone. Restricted to ADMIN role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Project deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN"),
            @ApiResponse(responseCode = "404", description = "No project exists with the given ID")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/projects/admin/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id){
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Add an image to a project's gallery",
            description = "Adds a new image entry to a project's image gallery. Restricted to ADMIN role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Image added successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed on request body"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN"),
            @ApiResponse(responseCode = "404", description = "No project exists with the given ID")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/projects/admin/{projectId}/images")
    public ResponseEntity<ProjectImageResponseDto> addProjectImage(@PathVariable Long projectId ,@Valid @RequestBody ProjectImageRequestDto projectImageRequestDto){

        return ResponseEntity.ok(projectService.addProjectImage(projectId,projectImageRequestDto));
    }

    @Operation(
            summary = "List a project's images (admin)",
            description = "Returns all images for a project, ordered by sort position. Intended for the "
                    + "admin gallery-editing screen. Restricted to ADMIN role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Images retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not an ADMIN"),
            @ApiResponse(responseCode = "404", description = "No project exists with the given ID")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/projects/admin/{projectId}/images")
    public ResponseEntity<List<ProjectImageResponseDto>> getProjectImages(@PathVariable Long projectId){
        return ResponseEntity.ok(projectService.getProjectImages(projectId));
    }


}
