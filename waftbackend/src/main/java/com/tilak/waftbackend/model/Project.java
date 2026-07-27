package com.tilak.waftbackend.model;

import com.tilak.waftbackend.record.SolutionItem;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private List<String> tags;

    @Column(name = "thumbnail_url")
    private String thumbNail;

    @Column(name = "hero_image_url")
    private String heroImage;

    private LocalDate date;
    private String brief;

    @Column(name= "problem_statement")
    private String problemStatement;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json",name = "solutions")
    private List<SolutionItem> solution;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json",name = "results")
    private List<SolutionItem> result;

    @Column(name = "final_thought")
    private String finalThought;

    @Builder.Default
    @Column(name = "is_published")
    private Boolean isPublished=true;

    @CreationTimestamp
    @Column(name = "created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at",nullable = false)
    private LocalDateTime  updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id",nullable = false)
    private WaftUser createdBy;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectImage> projectImages;






}
