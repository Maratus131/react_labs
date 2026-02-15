package com.example.server.enums;

import jakarta.persistence.EnumeratedValue;
import lombok.Getter;

@Getter
public enum CityEnum {
    PARIS("Paris"),
    COLOGNE("Cologne"),
    BRUSSELS("Brussels"),
    AMSTERDAM("Amsterdam"),
    HAMBURG("Hamburg"),
    DUSSELDORF("Dusseldorf");

    @EnumeratedValue
    private final String value;

    CityEnum(String value) {
        this.value = value;
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
