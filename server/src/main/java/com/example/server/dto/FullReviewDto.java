package com.example.server.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FullReviewDto {
    private int reviewId;
    private String comment;
    private int rating;
    private LocalDateTime date;

    private ReviewAuthor user;

    @Data
    public static class ReviewAuthor{
        private String username;
        private String avatarUrl;
        private boolean isPro;
    }
}
