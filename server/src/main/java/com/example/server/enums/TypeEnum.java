package com.example.server.enums;


import lombok.Getter;

@Getter
public enum TypeEnum {
    APARTMENT("Apartment"),
    HOUSE("House"),
    ROOM("Room"),
    HOTEL("Hotel");

    private final String value;

    TypeEnum(String value) {
        this.value = value;
    }

    public static TypeEnum fromValue(String value) {
        for (TypeEnum e : values()) {
            if (e.value.equalsIgnoreCase(value)) {
                return e;
            }
        }
        return null;
    }
}
