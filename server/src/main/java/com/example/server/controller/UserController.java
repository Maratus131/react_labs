package com.example.server.controller;

import com.example.server.dto.UserRegistrationDtoRequest;
import com.example.server.dto.UserDtoResponse;
import com.example.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<UserDtoResponse> registerUser(
            @ModelAttribute UserRegistrationDtoRequest request,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar
    ) throws IOException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerUser(request, avatar));
    }
}
