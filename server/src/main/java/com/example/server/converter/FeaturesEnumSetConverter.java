package com.example.server.converter;

import com.example.server.enums.FeaturesEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Converter(autoApply = false)
public class FeaturesEnumSetConverter implements AttributeConverter<Set<FeaturesEnum>, String[]> {

    @Override
    public String[] convertToDatabaseColumn(Set<FeaturesEnum> attribute) {
        if (attribute == null || attribute.isEmpty()) {
            return null;
        }
        return attribute.stream()
                .map(FeaturesEnum::name)
                .toArray(String[]::new);
    }

    @Override
    public Set<FeaturesEnum> convertToEntityAttribute(String[] dbData) {
        if (dbData == null || dbData.length == 0) {
            return new HashSet<>();
        }
        return Arrays.stream(dbData)
                .map(FeaturesEnum::valueOf)
                .collect(HashSet::new, HashSet::add, HashSet::addAll);
    }
}
