package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.ProjectImageRequestDto;
import com.tilak.waftbackend.dto.request.ProjectRequestDto;
import com.tilak.waftbackend.dto.request.ProjectUpdateRequestDto;
import com.tilak.waftbackend.dto.response.ProjectImageResponseDto;
import com.tilak.waftbackend.dto.response.ProjectResponseDto;
import com.tilak.waftbackend.exception.DuplicateSlugException;
import com.tilak.waftbackend.exception.ProjectImageNotFoundException;
import com.tilak.waftbackend.exception.ProjectNotFoundException;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.Project;
import com.tilak.waftbackend.model.ProjectImage;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.ProjectImageRepo;
import com.tilak.waftbackend.repository.ProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepo projectRepo;
    private final ProjectImageRepo projectImageRepo;

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

    @Transactional
    public ProjectResponseDto updateProject(Long id, ProjectUpdateRequestDto projectUpdateRequestDto) {

        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException("Project with id " + id + " does not exist"));

        if (projectUpdateRequestDto.getTitle() != null) {
            if (projectUpdateRequestDto.getTitle().isBlank()) {
                throw new IllegalArgumentException("Title cannot be blank");
            }

            String newSlug = generateSlug(projectUpdateRequestDto.getTitle());
            if (projectRepo.existsBySlugAndIdNot(newSlug, id)) {
                throw new DuplicateSlugException("A project with this slug already exists.");
            }

            project.setTitle(projectUpdateRequestDto.getTitle());
            project.setSlug(newSlug);
        }

        if (projectUpdateRequestDto.getTags() != null)
            project.setTags(projectUpdateRequestDto.getTags());

        if (projectUpdateRequestDto.getThumbnailUrl() != null)
            project.setThumbNail(projectUpdateRequestDto.getThumbnailUrl());

        if (projectUpdateRequestDto.getHeroImageUrl() != null)
            project.setHeroImage(projectUpdateRequestDto.getHeroImageUrl());

        if (projectUpdateRequestDto.getDate() != null)
            project.setDate(projectUpdateRequestDto.getDate());

        if (projectUpdateRequestDto.getBrief() != null)
            project.setBrief(projectUpdateRequestDto.getBrief());

        if (projectUpdateRequestDto.getProblemStatement() != null)
            project.setProblemStatement(projectUpdateRequestDto.getProblemStatement());

        if (projectUpdateRequestDto.getSolutions() != null)
            project.setSolution(projectUpdateRequestDto.getSolutions());

        if (projectUpdateRequestDto.getResults() != null)
            project.setResult(projectUpdateRequestDto.getResults());

        if (projectUpdateRequestDto.getFinalThought() != null)
            project.setFinalThought(projectUpdateRequestDto.getFinalThought());

        return Mapper.toProjectResponseDto(projectRepo.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException("Project with id " + id + " does not exist"));

        projectRepo.delete(project);
    }

    @Transactional
    public ProjectImageResponseDto addProjectImage(Long projectId, ProjectImageRequestDto projectImageRequestDto) {
        Project project = projectRepo.findById(projectId).orElseThrow(()-> new ProjectNotFoundException("Project with id: "+projectId+" is not found"));
        ProjectImage projectImage = Mapper.toProjectImage(projectImageRequestDto);
        projectImage.setProject(project);

        Integer nextSortOrder = projectImageRepo.findMaxSortOrderByProjectId(projectId)
                .map(Long::intValue)
                .orElse(-1) + 1;
        projectImage.setSortOrder(nextSortOrder);

        return Mapper.toProjectImageResponseDto(projectImageRepo.save(projectImage));
    }

    @Transactional(readOnly = true)
    public List<ProjectImageResponseDto> getProjectImages(Long projectId) {

        if (!projectRepo.existsById(projectId)) {
            throw new ProjectNotFoundException("Project with id: " + projectId + " is not found");
        }

        List<ProjectImage> images = projectImageRepo.findByProject_IdOrderBySortOrderAsc(projectId);

        return images.stream()
                .map(Mapper::toProjectImageResponseDto)
                .toList();
    }

    @Transactional
    public void deleteProjectImage(Long projectId, Long imageId) {

        if (!projectRepo.existsById(projectId)) {
            throw new ProjectNotFoundException("Project with id: " + projectId + " is not found");
        }

        ProjectImage image = projectImageRepo.findById(imageId)
                .orElseThrow(() -> new ProjectImageNotFoundException("Image with id: " + imageId + " is not found"));

        if (!image.getProject().getId().equals(projectId)) {
            throw new ProjectImageNotFoundException("Image with id: " + imageId + " does not belong to project with id: " + projectId);
        }

        projectImageRepo.delete(image);
    }
}
