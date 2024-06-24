package com.dev.e_commerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3001") // İzin verilen origin URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // İzin verilen HTTP methodları
                .allowCredentials(true); // Credential'ların (cookie, HTTP authentication) kullanımına izin ver
    }
}