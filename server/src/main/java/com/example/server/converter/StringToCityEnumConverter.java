package com.example.server.converter;

import com.example.server.enums.CityEnum;
import org.springframework.core.convert.converter.Converter;

public class StringToCityEnumConverter implements Converter<String, CityEnum> {
    @Override
    public CityEnum convert(String source) {
        return CityEnum.fromValue(source);
    }
}
