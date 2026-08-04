package com.tilak.waftbackend.exception;

public class InvalidReorderRequestException extends RuntimeException {
    public InvalidReorderRequestException(String message) {
        super(message);
    }
}