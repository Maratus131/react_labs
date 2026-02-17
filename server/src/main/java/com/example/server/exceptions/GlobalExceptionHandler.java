package com.example.server.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value =
            {
                    UserNotFoundException.class,
                    OfferNotFoundException.class,
            }
    )
    private ResponseEntity<ErrorResponse> handleNotFoundException(RuntimeException ex) {
        var errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                ex.getLocalizedMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpServletRequest request) {
        String errorMessage = "Endpoint " + request.getRequestURI() + " not found";

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                errorMessage
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {
            EmailExistException.class,
            UserExistException.class
    })
    public ResponseEntity<ErrorResponse> handleUniqueAttrExists(RuntimeException ex) {
        var errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                ex.getLocalizedMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(
            value = {
                    IncorrectEmailOrPassword.class,
                    ImageRequiredException.class,
            })
    public ResponseEntity<ErrorResponse> handleIncorrectRequest(RuntimeException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                ex.getLocalizedMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongUsernameOrPasswordException.class)
    public ResponseEntity<ErrorResponse> handleWrongUsernameOrPassword(WrongUsernameOrPasswordException ex, HttpServletRequest request) {
        String message = "Invalid username or password";
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),
                LocalDateTime.now(),
                message
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}
