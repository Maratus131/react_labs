package com.example.server.enums;

import lombok.Getter;

@Getter
public enum UserType {
    NORMAL("Normal"),
    PRO("Pro");

    private final String value;

    UserType(String value) {
        this.value = value;
    }

    public static UserType fromValue(String value) {
        for (UserType e : values()) {
            if (e.value.equalsIgnoreCase(value)) {
                return e;
            }
        }
        return null;
    }
}
