package com.tilak.waftbackend.jwt;

import com.tilak.waftbackend.service.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final CustomUserDetailService customUserDetailService;
    private final JwtService jwtService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {


        String jwtToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        if (jwtToken == null) {
            log.debug("No JWT cookie found in request URI: {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        final String email;

        try{
            email= jwtService.extractName(jwtToken);
        }

        catch (Exception e){
            log.debug("Failed to extract name from token,{} due to,{}",jwtToken,e.getMessage());
            filterChain.doFilter(request,response);
            return;
        }

        if (email!=null && SecurityContextHolder.getContext().getAuthentication()==null){

            UserDetails userDetails = customUserDetailService.loadUserByUsername(email);

            if (jwtService.isTokenValid(jwtToken,userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                log.info("User {} successfully authenticated for uri {}",email,request.getRequestURI());
            }

            else
                log.warn("invalid token for user {}",email);


        }

        filterChain.doFilter(request,response);


    }
}
