package com.tilak.waftbackend.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ApiErrorDto>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request){

        log.debug("Controller Method argument not valid");
        List<ApiErrorDto> apiErrorDto= e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error-> new ApiErrorDto(HttpStatus.BAD_REQUEST.value(),"Validation Failed",error.getDefaultMessage(),request.getContextPath(),error.getField())).toList();

        return ResponseEntity.badRequest().body(apiErrorDto);

    }
}
