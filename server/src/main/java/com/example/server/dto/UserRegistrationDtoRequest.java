package com.example.server.dto;

import com.example.server.enums.UserType;
import lombok.Data;

@Data
public class UserRegistrationDtoRequest {
    String email;
    String password;
    UserType userType;
    String userName;
}
