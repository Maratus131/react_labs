package com.example.server.exceptions;

public class IncorrectEmailOrPassword extends RuntimeException {
    public IncorrectEmailOrPassword() {
        super("Некорректный email или password");
    }
}
