package com.tilak.waftbackend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtService {

    private static final Logger log = LoggerFactory.getLogger(JwtService.class);
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExp;

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails);
    }

    private String generateToken(HashMap<String,Object> extraClaims, UserDetails userDetails) {

        return build(extraClaims,userDetails,jwtExp);
    }

    private String build(HashMap<String,Object> extraClaims, UserDetails userDetails, long jwtExp) {

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+jwtExp))
                .signWith(getSignInKey())
                .compact();
    }

    private SecretKey getSignInKey() {
        byte[] key= Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(key);
    }

    public boolean isTokenValid(String token,UserDetails userDetails){

        try{
            String username= extractName(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        }

        catch (ExpiredJwtException e)
        {
            log.warn("Jwt token has expired: {}", e.getMessage());
            return  false;
        }

        catch (Exception e){
            log.warn("Jwt validation failed for token: {} and {} ",token,e.getMessage());
            return false;
        }

    }

    private String extractName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpDate(String token){
        return extractClaim(token,Claims::getExpiration);

    }

    private<T> T extractClaim(String token, Function<Claims,T> claimResolver) {
        final Claims claims= extractAllClaim(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaim(String token) {

        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private boolean isTokenExpired(String token) {
        return extractExpDate(token).before(new Date());
    }


}
