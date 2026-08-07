package com.tilak.waftbackend.mapper;

import com.tilak.waftbackend.dto.request.*;
import com.tilak.waftbackend.dto.response.*;
import com.tilak.waftbackend.model.BlogPost;
import com.tilak.waftbackend.model.Project;
import com.tilak.waftbackend.model.ProjectImage;
import com.tilak.waftbackend.model.WaftUser;

import java.util.List;

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

    public static TeamMemberResponseDto toTeamMemberResponseDto(WaftUser waftUser)
    {
        return TeamMemberResponseDto.builder()
                .id(waftUser.getId())
                .name(waftUser.getName())
                .isActive(waftUser.getIsActive())
                .createdAt(waftUser.getCreatedAt())
                .photo(waftUser.getPhoto())
                .bio(waftUser.getBio())
                .roleTitle(waftUser.getRoleTitle())
                .build();

    }

    public static LoginResponseDto toResponseDto(WaftUser authenticatedUser) {

        return LoginResponseDto.builder()
                .fullName(authenticatedUser.getName())
                .role(authenticatedUser.getRole().name())
                .userId(authenticatedUser.getId())
                .build();

    }

    public static LoginResponseDto toResponseDtoForTeamMember(WaftUser authenticatedUser) {

        return LoginResponseDto.builder()
                .fullName(authenticatedUser.getName())
                .role(authenticatedUser.getRole().name())
                .userId(authenticatedUser.getId())
                .bio(authenticatedUser.getBio())
                .photo(authenticatedUser.getPhoto())
                .roleTitle(authenticatedUser.getRoleTitle())
                .build();

    }

    public static Project toProject(ProjectRequestDto requestDto){

        return Project.builder()
                .title(requestDto.getTitle())
                .brief(requestDto.getBrief())
                .date(requestDto.getDate())
                .heroImage(requestDto.getHeroImageUrl())
                .finalThought(requestDto.getFinalThought())
                .result(requestDto.getResults())
                .tags(requestDto.getTags())
                .thumbNail(requestDto.getThumbnailUrl())
                .solution(requestDto.getSolutions())
                .problemStatement(requestDto.getProblemStatement())
                .build();
    }

    public static ProjectResponseDto toProjectResponseDto(Project project){
        return ProjectResponseDto.builder()
                .title(project.getTitle())
                .thumbnailUrl(project.getThumbNail())
                .problemStatement(project.getProblemStatement())
                .date(project.getDate())
                .tags(project.getTags())
                .id(project.getId())
                .slug(project.getSlug())
                .createdByName(project.getCreatedBy().getName())
                .brief(project.getBrief())
                .isPublished(project.getIsPublished())
                .results(project.getResult())
                .finalThought(project.getFinalThought())
                .updatedAt(project.getUpdatedAt())
                .createdAt(project.getCreatedAt())
                .heroImageUrl(project.getHeroImage())
                .imageUrls(project.getProjectImages() == null ? List.of():project.getProjectImages().stream().map(ProjectImage::getImage).toList())
                .solutions(project.getSolution())
                .build();
    }

    public static ProjectResponseDto toProjectResponseDtoForUpdateRequest(ProjectUpdateRequestDto project){
        return ProjectResponseDto.builder()
                .title(project.getTitle())
                .problemStatement(project.getProblemStatement())
                .date(project.getDate())
                .tags(project.getTags())
                .brief(project.getBrief())
                .results(project.getResults())
                .finalThought(project.getFinalThought())
                .heroImageUrl(project.getHeroImageUrl())
                .solutions(project.getSolutions())
                .build();
    }

    public static ProjectImage toProjectImage(ProjectImageRequestDto requestDto){
        return ProjectImage.builder()
                .image(requestDto.getImage())
                .build();
    }

    public static ProjectImageResponseDto toProjectImageResponseDto(ProjectImage projectImage){
        return ProjectImageResponseDto.builder()
                .id(projectImage.getId())
                .image(projectImage.getImage())
                .sortOrder(projectImage.getSortOrder())
                .projectName(projectImage.getProject().getTitle())
                .createdAt(projectImage.getCreatedAt())
                .build();
    }

    public static BlogPost toBlogPost(BlogPostRequestDto requestDto) {
        return BlogPost.builder()
                .title(requestDto.getTitle())
                .category(requestDto.getCategory())
                .coverImageUrl(requestDto.getCoverImageUrl())
                .excerpt(requestDto.getExcerpt())
                .content(requestDto.getContent())
                .build();
    }

    public static BlogPostResponseDto toBlogPostResponseDto(BlogPost blogPost) {
        return BlogPostResponseDto.builder()
                .id(blogPost.getId())
                .slug(blogPost.getSlug())
                .title(blogPost.getTitle())
                .category(blogPost.getCategory())
                .coverImageUrl(blogPost.getCoverImageUrl())
                .excerpt(blogPost.getExcerpt())
                .content(blogPost.getContent())
                .isPublished(blogPost.getIsPublished())
                .createdAt(blogPost.getCreatedAt())
                .updatedAt(blogPost.getUpdatedAt())
                .authorName(blogPost.getAuthor().getName())
                .build();
    }


}
