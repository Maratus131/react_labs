package com.example.server.dto;

import lombok.Data;

@Data
public class AddReviewDtoRequest {
    private String comment;
    private int rating;
    private int offerId;
    private int userId;
}
