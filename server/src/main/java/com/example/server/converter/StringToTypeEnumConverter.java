package com.example.server.converter;

import com.example.server.enums.TypeEnum;
import org.springframework.core.convert.converter.Converter;

public class StringToTypeEnumConverter implements Converter<String, TypeEnum> {
    @Override
    public TypeEnum convert(String source) {
        return TypeEnum.fromValue(source);
    }
}
