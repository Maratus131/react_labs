package com.example.server.configuration;

import com.example.server.converter.StringToCityEnumConverter;
import com.example.server.converter.StringToFeaturesEnumConverter;
import com.example.server.converter.StringToTypeEnumConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToCityEnumConverter());
        registry.addConverter(new StringToTypeEnumConverter());
        registry.addConverter(new StringToFeaturesEnumConverter());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        Path uploadDir = Paths.get("uploads");
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/avatars/**")
                .addResourceLocations("file:" + uploadPath + "/avatars/");

        registry.addResourceHandler("/offers/**")
                .addResourceLocations("file:" + uploadPath + "/offers/");
    }
}