package com.example.server.enums;

import jakarta.persistence.EnumeratedValue;
import lombok.Getter;

@Getter
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

    public static FeaturesEnum fromValue(String value) {
        for (FeaturesEnum feature : values()) {
            if (feature.getValue().equalsIgnoreCase(value)) {
                return feature;
            }
        }
        return null;
    }

}
