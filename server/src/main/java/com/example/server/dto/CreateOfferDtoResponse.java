package com.example.server.dto;

import com.example.server.enums.CityEnum;
import com.example.server.enums.FeaturesEnum;
import com.example.server.enums.TypeEnum;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class CreateOfferDtoResponse {
    int id;
    String title;
    String description;
    LocalDateTime publishDate;
    CityEnum city;
    boolean isPremium;
    boolean isFavorite;
    double rating;
    TypeEnum type;
    int rooms;
    int guests;
    double price;
    Set<FeaturesEnum> features;
    int commentsCount;
    float latitude;
    float longitude;
    int userId;
    String previewImageUrl;
    List<String> photosUrl;
}
