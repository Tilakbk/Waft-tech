package com.tilak.waftbackend.repository;

import com.tilak.waftbackend.entity.WaftUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaftUserRepo extends JpaRepository<WaftUser,Long> {
}
