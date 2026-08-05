package com.tilak.waftbackend.exception;

public class TeamMemberNotFoundException extends RuntimeException {
    public TeamMemberNotFoundException(String message) {
        super(message);
    }
}
