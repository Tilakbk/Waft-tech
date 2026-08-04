package com.tilak.waftbackend.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ApiErrorDto>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request) {

        log.debug("Controller Method argument not valid");
        List<ApiErrorDto> apiErrorDto = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new ApiErrorDto(
                        HttpStatus.BAD_REQUEST.value(),
                        "Validation Failed",
                        error.getDefaultMessage(),
                        request.getRequestURI(),
                        error.getField()
                )).toList();

        return ResponseEntity.badRequest().body(apiErrorDto);

    }

    @ExceptionHandler(AdderNotFoundException.class)
    public ResponseEntity<ApiErrorDto> handleAdderNotFoundException(AdderNotFoundException e, HttpServletRequest request) {

        log.debug("Not found:{}", e.getMessage());

        ApiErrorDto apiErrorDto = new ApiErrorDto(HttpStatus.NOT_FOUND.value(), "User Not Found", e.getMessage(), request.getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorDto);

    }

    @ExceptionHandler(IllegalStateFoundException.class)
    public ResponseEntity<ApiErrorDto> handleIllegalStateFoundException(IllegalStateFoundException e, HttpServletRequest request) {
        log.warn("Not found,{}", e.getMessage());

        ApiErrorDto apiErrorDto = new ApiErrorDto(HttpStatus.NOT_FOUND.value(), "authenticated user not found ", e.getMessage(), request.getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorDto);


    }

    @ExceptionHandler(UserNotPermittedException.class)
    public ResponseEntity<ApiErrorDto> handleUserNotPermitted(UserNotPermittedException e, HttpServletRequest request) {
        ApiErrorDto error = new ApiErrorDto(HttpStatus.FORBIDDEN.value(), "Not Permitted", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiErrorDto> handleAuthenticationException(AuthenticationException e, HttpServletRequest request) {
        ApiErrorDto error = new ApiErrorDto(HttpStatus.UNAUTHORIZED.value(), "Authentication Failed", "Invalid email or password.", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(DuplicateSlugException.class)
    public ResponseEntity<ApiErrorDto> handleDuplicateSlugException(DuplicateSlugException e, HttpServletRequest request) {
        log.warn("Duplicate slug: {}", e.getMessage());

        ApiErrorDto apiErrorDto = new ApiErrorDto(HttpStatus.CONFLICT.value(), "Duplicate Slug", e.getMessage(), request.getRequestURI());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(apiErrorDto);
    }

    @ExceptionHandler(ProjectNotFoundException.class)
    public ResponseEntity<ApiErrorDto> handleProjectNotFoundException(ProjectNotFoundException e, HttpServletRequest request) {

        log.warn("Project not found: {}", e.getMessage());

        ApiErrorDto apiErrorDto = new ApiErrorDto(HttpStatus.NOT_FOUND.value(), "Project Not Found", e.getMessage(), request.getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorDto);
    }

    @ExceptionHandler(ProjectImageNotFoundException.class)
    public ResponseEntity<ApiErrorDto> handleProjectImageNotFoundException(ProjectImageNotFoundException e, HttpServletRequest request) {

        log.warn("Project image not found: {}", e.getMessage());

        ApiErrorDto apiErrorDto = new ApiErrorDto(HttpStatus.NOT_FOUND.value(), "Project Image Not Found", e.getMessage(), request.getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorDto);
    }
}
