package com.tilak.waftbackend.exception;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ApiErrorDto {
    private final LocalDateTime timestamp;
    private final int status;
    private final String error;
    private final String message;
    private final String path;
    private String field;

    public ApiErrorDto(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public ApiErrorDto(int status, String error, String message, String path,String field) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.field=field;
    }
}
