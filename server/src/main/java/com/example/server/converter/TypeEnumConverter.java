package com.example.server.converter;

import com.example.server.enums.TypeEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TypeEnumConverter implements AttributeConverter<TypeEnum, String> {

    @Override
    public String convertToDatabaseColumn(TypeEnum attribute) {
        return attribute ==  null ? null : attribute.toString();
    }

    @Override
    public TypeEnum convertToEntityAttribute(String dbData) {
        return dbData == null ? null: TypeEnum.fromValue(dbData);
    }
}
