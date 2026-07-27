package com.tilak.waftbackend.service;

import com.tilak.waftbackend.dto.request.ProjectRequestDto;
import com.tilak.waftbackend.dto.response.ProjectResponseDto;
import com.tilak.waftbackend.exception.DuplicateSlugException;
import com.tilak.waftbackend.mapper.Mapper;
import com.tilak.waftbackend.model.Project;
import com.tilak.waftbackend.model.WaftUser;
import com.tilak.waftbackend.repository.ProjectRepo;
import lombok.RequiredArgsConstructor;
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

        return Mapper.toProjectResponseDto(projectRepo.save(newProject));

    }


        private String generateSlug(String title) {
            return title.toLowerCase()
                    .trim()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-");
        }

}
