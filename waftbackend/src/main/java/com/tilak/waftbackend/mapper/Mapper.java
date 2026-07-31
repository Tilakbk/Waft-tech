package com.tilak.waftbackend.mapper;

import com.tilak.waftbackend.dto.request.CreateWaftUserRequestDto;
import com.tilak.waftbackend.dto.request.ProjectImageRequestDto;
import com.tilak.waftbackend.dto.request.ProjectRequestDto;
import com.tilak.waftbackend.dto.request.ProjectUpdateRequestDto;
import com.tilak.waftbackend.dto.response.LoginResponseDto;
import com.tilak.waftbackend.dto.response.ProjectImageResponseDto;
import com.tilak.waftbackend.dto.response.ProjectResponseDto;
import com.tilak.waftbackend.dto.response.WaftUserResponseDto;
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


}
