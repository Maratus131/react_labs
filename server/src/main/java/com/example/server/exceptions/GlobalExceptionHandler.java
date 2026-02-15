package com.example.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<Object> handleNotFoundException(RuntimeException ex, HttpStatus status) {
        return null;
    }
}
