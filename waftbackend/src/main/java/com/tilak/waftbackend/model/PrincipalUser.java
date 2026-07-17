package com.tilak.waftbackend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Getter
@RequiredArgsConstructor
public class PrincipalUser implements UserDetails {

    private final WaftUser waftUser;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+waftUser.getRole().name()));
    }

    @Override
    public @Nullable String getPassword() {
        return waftUser.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return waftUser.getEmail();
    }

    @Override
    public boolean isEnabled()
    {
        return waftUser.getIsActive();
    }
}
