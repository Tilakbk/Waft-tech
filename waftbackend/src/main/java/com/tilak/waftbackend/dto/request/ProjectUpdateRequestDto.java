package com.tilak.waftbackend.dto.request;


import com.tilak.waftbackend.record.SolutionItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectUpdateRequestDto {

    private String title;

    private List<String> tags;

    private String thumbnailUrl;

    private String heroImageUrl;

    private LocalDate date;

    private String brief;

    private String problemStatement;

    private List<SolutionItem> solutions;

    private List<SolutionItem> results;

    private String finalThought;
}
