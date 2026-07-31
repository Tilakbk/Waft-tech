package com.tilak.waftbackend.exception;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(String message) {
        super(message);
    }
}
