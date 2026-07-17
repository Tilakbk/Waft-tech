package com.tilak.waftbackend.service;


import com.tilak.waftbackend.model.PrincipalUser;
import com.tilak.waftbackend.repository.WaftUserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final WaftUserRepo waftUserRepo;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email)  {

        log.info("Attempting load principal user from the database by email:{}",email) ;
        PrincipalUser user= waftUserRepo.findByEmail(email).map(PrincipalUser::new).orElseThrow(()->new UsernameNotFoundException("User with this email not found"+email));
        log.info("User successfully loaded with the mentioned email and role:{} and :{}",email,user.getWaftUser().getRole());
        return user;

    }
}
