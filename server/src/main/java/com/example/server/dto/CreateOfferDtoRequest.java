package com.example.server.dto;

import com.example.server.enums.CityEnum;
import com.example.server.enums.FeaturesEnum;
import com.example.server.enums.TypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class CreateOfferDtoRequest {
    @Schema(example = "Уютная квартира в центре Дюсельдорфа")
    String title;

    @Schema(example = "Какое-то описание")
    String description;

    LocalDateTime publishDate;

    @Schema(example = "Dusseldorf")
    CityEnum city;

    @Schema(example = "true")
    boolean isPremium;

    @Schema(example = "true")
    boolean isFavorite;

    @Schema(example = "4.7")
    double rating;

    @Schema(example = "Apartment")
    TypeEnum type;

    @Schema(example = "5")
    int rooms;

    @Schema(example = "7")
    int guests;

    @Schema(example = "300")
    double price;

    Set<FeaturesEnum> features;

    @Schema(example = "3")
    int commentsCount;

    @Schema(example = "53.56")
    float latitude;

    @Schema(example = "10.06")
    float longitude;

    @Schema(example = "2")
    int userId;
}
