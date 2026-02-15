package com.example.server.dto;

import com.example.server.enums.FeaturesEnum;
import com.example.server.enums.TypeEnum;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class FullOfferDto {
    private int id;
    private String title;
    private String description;
    private LocalDateTime publishDate;

    private OfferDtoResponse.CityDto city;
    private boolean isPremium;
    private boolean isFavorite;
    private double rating;
    private TypeEnum type;
    private int rooms;
    private int guests;
    private double price;
    private Set<FeaturesEnum> features;
    private int commentsCount;

    private OfferDtoResponse.LocationDto location;

    private UserDtoResponse author;
    private String previewImageUrl;
    List<String> photosUrl;
}
