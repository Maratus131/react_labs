package com.example.server.service;

import com.example.server.dto.UserDtoResponse;
import com.example.server.dto.UserRegistrationDtoRequest;
import com.example.server.exceptions.EmailExistException;
import com.example.server.exceptions.IncorrectEmailOrPassword;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {
    @Value("${app.base-url}")
    private String baseUrl;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    public UserDtoResponse registerUser(UserRegistrationDtoRequest request, MultipartFile avatar) throws IOException {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new IncorrectEmailOrPassword();
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailExistException();
        }

        String avatarFilename = fileStorageService.saveImage(avatar, "avatars");

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAvatar(avatarFilename);
        user.setUsername(request.getUserName());
        user.setUserType(request.getUserType());
        userRepository.save(user);

        return mapToDto(user);
    }

    public User findByUsernameOrThrow(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public UserDtoResponse mapToDto(User user) {
        UserDtoResponse response = new UserDtoResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setAvatarUrl(fileStorageService.prepareUrl(baseUrl, user.getAvatar()));
        response.setPro(user.getUserType().name().equals("PRO"));

        return response;
    }
}
