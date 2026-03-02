package com.example.server.controller;

import com.example.server.dto.AuthRequest;
import com.example.server.dto.AuthResponse;
import com.example.server.dto.AuthUserResponse;
import com.example.server.dto.RefreshRequest;
import com.example.server.enums.UserType;
import com.example.server.model.User;
import com.example.server.security.CustomUserDetails;
import com.example.server.service.FileStorageService;
import com.example.server.service.JwtService;
import com.example.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final FileStorageService fileStorageService;

    @Value("${app.base-url}")
    private String baseUrl;

    @PostMapping("/login")
    @Operation(summary = "Аутентификация и получение токена")
    public AuthResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        User user = userService.findByEmailOrThrow(authRequest.getEmail());

        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());

        return new AuthResponse(accessToken, refreshToken);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Рефреш acсess токена")
    public AuthResponse refresh(@RequestBody RefreshRequest refreshRequest) {
        String refreshToken = refreshRequest.getRefreshToken();

        if (!jwtService.isRefreshToken(refreshToken)) {
            throw new IllegalArgumentException("Invalid refresh token");
        }

        String email = jwtService.extractEmail(refreshToken);
        Integer userId = jwtService.extractUserId(refreshToken);

        String newAccessToken = jwtService.generateAccessToken(userId, email);
        return new AuthResponse(newAccessToken, refreshToken);
    }

    @GetMapping("/login")
    @Operation(summary = "Проверка аутентификации", description = "Проверка на то, что пользователь в данный момент аутентифицирован")
    public AuthUserResponse checkAuth(@AuthenticationPrincipal CustomUserDetails userDetails) {

        if (userDetails == null) {
            throw new UsernameNotFoundException("User is not authenticated");
        }

        User user = userDetails.getUser();

        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail());

        return new AuthUserResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                fileStorageService.prepareUrl(baseUrl, user.getAvatar()),
                user.getUserType() == UserType.PRO,
                accessToken
        );
    }

    @DeleteMapping("/logout")
    @Operation(summary = "Выход из аккаунта")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}
