package com.example.server.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AddReviewDtoRequest {
    @Schema(example = "Good review!!!")
    private String comment;

    @Schema(example = "5")
    private int rating;

    @Schema(example = "1")
    private int offerId;

    @Schema(example = "1")
    private int userId;
}
