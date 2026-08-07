package com.tilak.waftbackend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "blog_post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 100)
    private String category;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @Column(length = 300)
    private String excerpt;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Builder.Default
    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private WaftUser author;

}