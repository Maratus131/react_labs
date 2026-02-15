package com.example.server.exceptions;

public class EmailExistException extends RuntimeException {
    public EmailExistException() {
        super("Пользователь с таким email существует");
    }
}
