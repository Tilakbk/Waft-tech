package com.tilak.waftbackend.service;

import com.tilak.waftbackend.repository.WaftUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaftUserService {

    private final WaftUserRepo waftUserRepo;
    private final PasswordEncoder passwordEncoder;






}
