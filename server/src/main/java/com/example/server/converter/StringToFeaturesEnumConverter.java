package com.example.server.converter;

import com.example.server.enums.FeaturesEnum;
import com.example.server.enums.TypeEnum;
import org.springframework.core.convert.converter.Converter;

public class StringToFeaturesEnumConverter implements Converter<String, FeaturesEnum> {
    @Override
    public FeaturesEnum convert(String source) {
        return FeaturesEnum.fromValue(source);
    }
}
