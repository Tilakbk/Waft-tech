package com.tilak.waftbackend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReorderRequestDto {

    @NotEmpty(message = "Image id list is mandatory")
    private List<Long> imageIds;
}