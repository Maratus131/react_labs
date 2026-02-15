package com.example.server.exceptions;

import java.time.LocalDateTime;

public record ErrorResponse(int status, LocalDateTime timestamp, String message) {
}