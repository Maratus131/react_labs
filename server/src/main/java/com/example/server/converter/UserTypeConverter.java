package com.example.server.converter;

import com.example.server.enums.UserType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class UserTypeConverter implements AttributeConverter<UserType, String> {
    @Override
    public String convertToDatabaseColumn(UserType attribute) {
        return attribute ==  null ? null : attribute.toString();
    }

    @Override
    public UserType convertToEntityAttribute(String dbData) {
        return dbData == null ? null: UserType.fromValue(dbData);
    }
}
