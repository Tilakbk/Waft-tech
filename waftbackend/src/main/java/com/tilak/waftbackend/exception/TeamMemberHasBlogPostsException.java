package com.tilak.waftbackend.exception;

public class TeamMemberHasBlogPostsException extends RuntimeException {
    public TeamMemberHasBlogPostsException(String message) {
        super(message);
    }
}