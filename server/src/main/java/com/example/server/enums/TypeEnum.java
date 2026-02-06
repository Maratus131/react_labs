package com.example.server.enums;


public enum TypeEnum {
    APARTMENT("Apartment"),
    HOUSE("House"),
    ROOM("Room"),
    HOTEL("Hotel");

    private final String value;

    TypeEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static TypeEnum fromValue(String value) {
        for (TypeEnum e : values()) {
            if (e.value.equals(value)) {
                return e;
            }
        }
        return null;
    }
}
