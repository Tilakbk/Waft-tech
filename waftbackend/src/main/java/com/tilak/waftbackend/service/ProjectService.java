package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.ProjectRequestDto;
import com.tilak.waftbackend.dto.response.ProjectResponseDto;
import com.tilak.waftbackend.exception.DuplicateSlugException;
import com.tilak.waftbackend.exception.ProjectNotFoundException;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.Project;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.ProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepo projectRepo;

    @Transactional
    public ProjectResponseDto addProject(ProjectRequestDto projectRequestDto, WaftUser waftUser) {

        String slug = generateSlug(projectRequestDto.getTitle());
        if (projectRepo.existsBySlug(slug)){
            throw new DuplicateSlugException("A project with this slug already exists.");
        }
        Project newProject= Mapper.toProject(projectRequestDto);
        newProject.setCreatedBy(waftUser);
        newProject.setSlug(slug);

        return Mapper.toProjectResponseDto(projectRepo.save(newProject));

    }


        private String generateSlug(String title) {
            return title.toLowerCase()
                    .trim()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-");
        }

    @Transactional(readOnly = true)
    public Page<ProjectResponseDto> getAllProject(Pageable pageable) {

        Page<Project> projectList = projectRepo.findAll(pageable);

        return projectList.map(Mapper::toProjectResponseDto);

    }

    @Transactional(readOnly = true)
    public Page<ProjectResponseDto> getPublishedProject(String tag, Pageable pageable) {
        if (tag == null || tag.isBlank()) {
            Page<Project> projectPage = projectRepo.findByIsPublishedTrue(pageable);
            return projectPage.map(Mapper::toProjectResponseDto);
        }

        Pageable unsorted = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        Page<Project> projectPage = projectRepo.findByIsPublishedTrueAndTag(tag, unsorted);
        return projectPage.map(Mapper::toProjectResponseDto);
    }

    @Transactional(readOnly = true)
    public ProjectResponseDto getPublishedProjectBySlug(String slug) {

        Project project = projectRepo.findBySlugAndIsPublishedTrue(slug)
                .orElseThrow(() -> new ProjectNotFoundException("No published project found with slug: " + slug));

        return Mapper.toProjectResponseDto(project);
    }

    @Transactional(readOnly = true)
    public ProjectResponseDto getProjectById(Long id) {

        Project project = projectRepo.findById(id).orElseThrow(()->new ProjectNotFoundException(id+" Project with this id does not exist"));
        return Mapper.toProjectResponseDto(project);
    }

    @Transactional
    public ProjectResponseDto updateProjectPublishStatus(Long id) {

        Project project = projectRepo.findById(id).orElseThrow(()->new ProjectNotFoundException(id+" Project with this id does not exist"));
        project.setIsPublished(!project.getIsPublished());
        return Mapper.toProjectResponseDto(projectRepo.save(project));
    }
}
