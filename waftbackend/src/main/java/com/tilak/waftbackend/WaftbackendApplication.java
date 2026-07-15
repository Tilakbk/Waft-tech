package com.tilak.waftbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class WaftbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(WaftbackendApplication.class, args);
    }

}
