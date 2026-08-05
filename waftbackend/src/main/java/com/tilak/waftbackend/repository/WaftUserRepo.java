package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.model.WaftUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WaftUserRepo extends JpaRepository<WaftUser,Long> {
    Optional<WaftUser> findByEmail(String email);
}
