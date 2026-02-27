package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthUserResponse {
    private Integer id;
    private String email;
    private String username;
    private String avatar;
    private Boolean isPro;
    private String accessToken;
}
