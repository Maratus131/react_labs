package com.example.server.exceptions;

public class WrongUsernameOrPasswordException extends RuntimeException {
    public WrongUsernameOrPasswordException() {
        super("Username or password is incorrect");
    }
}
