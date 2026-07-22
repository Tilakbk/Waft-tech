package com.tilak.waftbackend.exception;

public class UserNotPermittedException extends RuntimeException {
    public UserNotPermittedException(String message) {
        super(message);
    }
}
