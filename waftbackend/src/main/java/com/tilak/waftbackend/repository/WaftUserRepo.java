package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.enums.Role;
import com.tilak.waftbackend.model.WaftUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WaftUserRepo extends JpaRepository<WaftUser,Long> {
    Optional<WaftUser> findByEmail(String email);

    List<WaftUser> findAllByRole(Role role);

    @Query("SELECT user FROM WaftUser user WHERE user.role= :role AND user.isActive=true AND user.photo IS NOT NULL")
    List<WaftUser> findAllByRoleAndIsActiveTrueAndPhotoIsNotNull(@Param("role") Role role);
}
