package com.example.server.enums;

import jakarta.persistence.EnumeratedValue;

public enum CityEnum {
    PARIS("Paris"),
    COLOGNE("Cologne"),
    BRUSSELS("Brussels"),
    AMSTERDAM("Amsterdam"),
    HAMBURG("HAMBURG"),
    DUSSELDORF("Dusseldorf");

    @EnumeratedValue
    private final String value;

    CityEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static CityEnum fromValue(String value) {
        for (CityEnum city : values()) {
            if (city.getValue().equals(value)) {
                return city;
            }
        }
        return null;
    }
}
