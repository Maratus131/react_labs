package com.example.server.dto;

import com.example.server.enums.CityEnum;
import com.example.server.enums.FeaturesEnum;
import com.example.server.enums.TypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class OfferDtoResponse {
    private int id;
    private String title;
    private String description;
    private LocalDateTime publishDate;

    private CityDto city;
    private boolean isPremium;
    private boolean isFavorite;
    private double rating;
    private String type;
    private int rooms;
    private int guests;
    private double price;
    private Set<String> features;
    private int commentsCount;

    private LocationDto location;

    private int userId;
    private String previewImage;
    List<String> images;

    @Data
    public static class CityDto{
        private String name;
        private LocationDto location;
    }

    @Data
    @AllArgsConstructor
    public static class LocationDto{
        private double latitude;
        private double longitude;
        private int zoom;
    }
}
