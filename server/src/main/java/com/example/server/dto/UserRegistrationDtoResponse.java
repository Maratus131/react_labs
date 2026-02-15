package com.example.server.dto;

import lombok.Data;

@Data
public class UserRegistrationDtoResponse {
    private int id;
    private String email;
    private String username;
    private String avatarUrl;
    private boolean isPro;
}
