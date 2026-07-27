package com.tilak.waftbackend.controller;

import com.tilak.waftbackend.repository.ProjectRepo;
import com.tilak.waftbackend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

}
