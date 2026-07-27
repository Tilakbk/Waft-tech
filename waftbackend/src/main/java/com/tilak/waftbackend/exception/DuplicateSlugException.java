package com.tilak.waftbackend.exception;

public class DuplicateSlugException extends RuntimeException {
    public DuplicateSlugException(String message) {
        super(message);
    }
}
