package com.example.hcmiuweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private final Map<String, OtpData> otpMap = new ConcurrentHashMap<>();
    private static final int OTP_LENGTH = 6;
    private static final int OTP_VALIDITY_MINUTES = 5;

    @Autowired
    private EmailService emailService;

    public String generateAndSendOtp(String email) {
        String otp = generateOtp();
        otpMap.put(email, new OtpData(otp, LocalDateTime.now()));
        emailService.sendOtpEmail(email, otp);
        return otp;
    }

    public boolean validateOtp(String email, String otp) {
        OtpData otpData = otpMap.get(email);
        if (otpData == null) {
            return false;
        }

        boolean isValid = otpData.otp.equals(otp) && 
                         !LocalDateTime.now().isAfter(otpData.createdAt.plusMinutes(OTP_VALIDITY_MINUTES));
        
        if (isValid) {
            otpMap.remove(email);
        }
        
        return isValid;
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    private static class OtpData {
        private final String otp;
        private final LocalDateTime createdAt;

        public OtpData(String otp, LocalDateTime createdAt) {
            this.otp = otp;
            this.createdAt = createdAt;
        }
    }
} 