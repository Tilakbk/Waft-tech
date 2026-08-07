package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.dto.request.BlogPostRequestDto;
import com.tilak.waftbackend.dto.request.BlogPostUpdateRequestDto;
import com.tilak.waftbackend.dto.response.BlogPostResponseDto;
import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.service.BlogPostService;
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

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Blog Post", description = "Endpoints for managing Waft Tech blog posts. Public listing and detail require no auth. Only TEAM_MEMBER can create/update/delete/toggle, and only their own posts. ADMIN and HR can view every post but cannot modify any.")
public class BlogPostController {

    private final BlogPostService blogPostService;

    @Operation(
            summary = "Create a new blog post",
            description = "Creates a new blog post, authored as the authenticated user. Generates a "
                    + "unique, URL-friendly slug from the title. New posts are published by default. "
                    + "Restricted to TEAM_MEMBER role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Blog post created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed on request body"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not a TEAM_MEMBER"),
            @ApiResponse(responseCode = "409", description = "A blog post with the generated slug already exists")
    })
    @PreAuthorize("hasRole('TEAM_MEMBER')")
    @PostMapping("/blog-posts")
    public ResponseEntity<BlogPostResponseDto> addBlogPost(@Valid @RequestBody BlogPostRequestDto requestDto, Authentication authentication) {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(blogPostService.addBlogPost(requestDto, principal.getWaftUser()));
    }

    @Operation(
            summary = "List blog posts (admin)",
            description = "TEAM_MEMBER callers see only their own posts, including unpublished drafts. "
                    + "ADMIN and HR callers see every post from every author. Restricted to authenticated staff."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Blog posts retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT")
    })
    @PreAuthorize("hasAnyRole('ADMIN','HR','TEAM_MEMBER')")
    @GetMapping("/blog-posts/admin")
    public ResponseEntity<Page<BlogPostResponseDto>> getAllBlogPostsAdmin(
            @ParameterObject @PageableDefault(size = 12, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            Authentication authentication) {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(blogPostService.getAllBlogPostsAdmin(pageable, principal.getWaftUser()));
    }

    @Operation(
            summary = "List published blog posts",
            description = "Returns a paginated list of published blog posts, optionally filtered by "
                    + "category. Public endpoint, no authentication required."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Published blog posts retrieved successfully")
    })
    @GetMapping("/blog-posts")
    public ResponseEntity<Page<BlogPostResponseDto>> getPublishedBlogPosts(
            @RequestParam(required = false) String category,
            @ParameterObject @PageableDefault(size = 9, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(blogPostService.getPublishedBlogPosts(category, pageable));
    }

    @Operation(
            summary = "Get a published blog post by slug",
            description = "Returns a single published blog post by its URL slug. Public endpoint, no "
                    + "authentication required. Unpublished posts and nonexistent slugs both return "
                    + "404, indistinguishably."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Blog post retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No published blog post exists with the given slug")
    })
    @GetMapping("/blog-posts/{slug}")
    public ResponseEntity<BlogPostResponseDto> getPublishedBlogPostBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogPostService.getPublishedBlogPostBySlug(slug));
    }

    @Operation(
            summary = "Get any blog post by ID (admin)",
            description = "Returns a blog post by its numeric ID regardless of publish status. "
                    + "TEAM_MEMBER callers can only fetch their own posts this way (404 otherwise). "
                    + "ADMIN and HR can fetch any post. Restricted to authenticated staff."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Blog post retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "404", description = "No blog post exists with the given ID, or it belongs to another team member")
    })
    @PreAuthorize("hasAnyRole('ADMIN','HR','TEAM_MEMBER')")
    @GetMapping("/blog-posts/admin/{id}")
    public ResponseEntity<BlogPostResponseDto> getBlogPostById(@PathVariable Long id, Authentication authentication) {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(blogPostService.getBlogPostById(id, principal.getWaftUser()));
    }

    @Operation(
            summary = "Partially update a blog post",
            description = "Updates one or more fields of a blog post. Only fields present in the "
                    + "request body are modified. If the title is updated, the post's slug is "
                    + "automatically regenerated. Restricted to the post's own author (TEAM_MEMBER) — "
                    + "ADMIN and HR cannot update any post through this endpoint."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Blog post updated successfully"),
            @ApiResponse(responseCode = "400", description = "Title was provided but is blank"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not this post's author"),
            @ApiResponse(responseCode = "404", description = "No blog post exists with the given ID"),
            @ApiResponse(responseCode = "409", description = "The regenerated slug collides with another post's slug")
    })
    @PreAuthorize("hasRole('TEAM_MEMBER')")
    @PatchMapping("/blog-posts/admin/{id}")
    public ResponseEntity<BlogPostResponseDto> updateBlogPost(@PathVariable Long id, @RequestBody BlogPostUpdateRequestDto requestDto, Authentication authentication) {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(blogPostService.updateBlogPost(id, requestDto, principal.getWaftUser()));
    }

    @Operation(
            summary = "Toggle a blog post's publish status",
            description = "Flips a blog post between published and unpublished. Restricted to the "
                    + "post's own author (TEAM_MEMBER) — ADMIN and HR cannot toggle any post."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Publish status toggled successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not this post's author"),
            @ApiResponse(responseCode = "404", description = "No blog post exists with the given ID")
    })
    @PreAuthorize("hasRole('TEAM_MEMBER')")
    @PatchMapping("/blog-posts/{id}/publish")
    public ResponseEntity<BlogPostResponseDto> togglePublishStatus(@PathVariable Long id, Authentication authentication) {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        return ResponseEntity.ok(blogPostService.togglePublishStatus(id, principal.getWaftUser()));
    }

    @Operation(
            summary = "Delete a blog post",
            description = "Permanently deletes a blog post. This action cannot be undone. Restricted "
                    + "to the post's own author (TEAM_MEMBER) — ADMIN and HR cannot delete any post."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Blog post deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "403", description = "Authenticated user is not this post's author"),
            @ApiResponse(responseCode = "404", description = "No blog post exists with the given ID")
    })
    @PreAuthorize("hasRole('TEAM_MEMBER')")
    @DeleteMapping("/blog-posts/admin/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id, Authentication authentication) {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();
        blogPostService.deleteBlogPost(id, principal.getWaftUser());
        return ResponseEntity.noContent().build();
    }

}