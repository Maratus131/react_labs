package com.example.server.enums;

import jakarta.persistence.EnumeratedValue;
import lombok.Getter;

@Getter
public enum CityEnum {
    PARIS("Paris", 48.8566, 2.3522, 13),
    COLOGNE("Cologne", 50.9375, 6.9603, 13),
    BRUSSELS("Brussels", 50.8503, 4.3517, 13),
    AMSTERDAM("Amsterdam", 52.3676, 4.9041, 13),
    HAMBURG("Hamburg", 53.5511, 9.9937, 13),
    DUSSELDORF("Dusseldorf", 51.2277, 6.7735, 13);

    @EnumeratedValue
    private final String value;

    private final double latitude;
    private final double longitude;
    private final int zoom;

    CityEnum(String value,  double latitude, double longitude, int zoom) {
        this.value = value;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
    }

    public static CityEnum fromValue(String value) {
        for (CityEnum city : values()) {
            if (city.getValue().equalsIgnoreCase(value)) {
                return city;
            }
        }
        return null;
    }
}
