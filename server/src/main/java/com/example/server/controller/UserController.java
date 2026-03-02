package com.example.server.controller;

import com.example.server.dto.UserRegistrationDtoRequest;
import com.example.server.dto.UserDtoResponse;
import com.example.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Tag(name = "Users", description = "Work with user data")
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    @Operation(summary = "Send user data to register", description = "Отправляет данные пользователя для его регистрации")
    @ApiResponse(responseCode = "201", description = "Пользователь успешно добавлен")
    public ResponseEntity<UserDtoResponse> registerUser(
            @ModelAttribute UserRegistrationDtoRequest request,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar
    ) throws IOException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerUser(request, avatar));
    }
}
