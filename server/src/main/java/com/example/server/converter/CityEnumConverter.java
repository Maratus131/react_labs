package com.example.server.converter;

import com.example.server.enums.CityEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class CityEnumConverter implements AttributeConverter<CityEnum, String> {
    @Override
    public String convertToDatabaseColumn(CityEnum attribute) {
        return attribute == null ? null : attribute.getValue();
    }

    @Override
    public CityEnum convertToEntityAttribute(String dbData) {
        return dbData == null ? null : CityEnum.fromValue(dbData);
    }
}
