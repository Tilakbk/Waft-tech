package com.tilak.waftbackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "waft_user")
@Getter
@NoArgsConstructor
public class WaftUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @Email(message = "Enter a valid email")
    private String email;

    @NotNull
    private String passwordHash;

    @NotNull
    private


}
