package com.example.server.dto;

import com.example.server.enums.UserType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UserRegistrationDtoRequest {
    @Schema(example = "user@gmail.com")
    String email;
    @Schema(example = "pass123")
    String password;
    @Schema(example = "NORMAL")
    UserType userType;
    @Schema(example = "User")
    String userName;
}
