package com.tilak.waftbackend;

import org.springframework.boot.SpringApplication;

public class TestWaftbackendApplication {

    public static void main(String[] args) {
        SpringApplication.from(WaftbackendApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
