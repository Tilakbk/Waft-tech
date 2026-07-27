package com.tilak.waftbackend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String slug;

    @Column(nullable = false)
    private String title;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = true,columnDefinition = "json")
    private List<String> tags;

    @Column(nullable =true,name = "thumbnail_url")
    private String thumbNail;

    @Column(nullable = true,name = "hero_image_url")
    private String heroImage;

    @Column(nullable = true)
    private LocalDate date;

    @Column(nullable = false)
    private String brief;

    @Column(name= "problem_statement",nullable = false)
    private String problemStatement;

    @Column(nullable = false)
    private String solution;

    @Column(nullable =true)
    private String result;

    @Column(nullable = true,name = "final_thought")
    private String finalThought;

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
