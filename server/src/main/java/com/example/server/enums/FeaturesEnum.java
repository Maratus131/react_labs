package com.example.server.enums;

import jakarta.persistence.EnumeratedValue;

public enum FeaturesEnum {
    BREAKFAST("Breakfast"),
    AIR_CONDITIONING("Air conditioning"),
    LAPTOP_FRIENDLY_WORKSPACE("Laptop friendly workspace"),
    BABY_SEAT("Baby seat"),
    WASHER("Washer"),
    TOWELS("Towels"),
    FRIDGE("Fridge");

    @EnumeratedValue
    private String value;

    FeaturesEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
