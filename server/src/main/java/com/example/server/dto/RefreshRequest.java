package com.example.server.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class RefreshRequest {
    @Schema(example = "refreshToken")
    private String refreshToken;
}
