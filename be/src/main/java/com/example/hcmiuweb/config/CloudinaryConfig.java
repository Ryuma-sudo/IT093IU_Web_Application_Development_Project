package com.example.hcmiuweb.config;

import com.cloudinary.Cloudinary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    private static final Logger logger = LoggerFactory.getLogger(CloudinaryConfig.class);

    // Directly using values from your application.properties for testing
    // In production, use the @Value approach
    private final String cloudName = "dawqjfhsi";
    private final String apiKey = "192299998713152";
    private final String apiSecret = "dVncY0E--Rn59iOHAwUInF30rYw";

    @Bean
    public Cloudinary cloudinary() {
        logger.info("Initializing Cloudinary with cloud name: {}", cloudName);
        logger.info("API Key is present: {}", apiKey != null && !apiKey.isEmpty());
        
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        
        return new Cloudinary(config);
    }
}