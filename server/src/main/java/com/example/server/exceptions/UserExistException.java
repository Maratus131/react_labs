package com.example.server.exceptions;

public class UserExistException extends RuntimeException {
    public UserExistException() {
        super("Пользователь с таким username существует");
    }
}
