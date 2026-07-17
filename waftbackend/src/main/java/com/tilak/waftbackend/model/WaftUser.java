package com.tilak.waftbackend.model;

import com.tilak.waftbackend.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.time.LocalDateTime;

@Entity
@Table(name = "waft_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaftUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100)
    private String name;

    @Email(message = "Enter a valid email")
    @Column(nullable = false,length = 150)
    private String email;

    @Column(name = "password_hash",nullable = false,length = 255)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder.Default
    @Column(name = "is_active",nullable = false)
    private Boolean isActive=true;

    @Column(name = "photo",length = 500)
    private String photo;

    private String bio;

    @Column(name = "role_title",length = 100)
    private String roleTitle;

    @CreationTimestamp
    @Column(name = "created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at",nullable = false)
    private LocalDateTime  updatedAt;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private WaftUser createdBy;

}
