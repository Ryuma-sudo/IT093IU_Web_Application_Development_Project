package com.example.hcmiuweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tinchuanemnhe@gmail.com");
        message.setTo(to);
        message.setSubject("Your Login OTP Code");
        message.setText("Your OTP code is: " + otp + "\n\nThis code will expire in 5 minutes.");
        
        emailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@hcmiu.edu.vn");
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, enter the below token in website:\n\n" +
                 resetToken + "\n\n" +
                "If you did not request a password reset, please ignore this email.\n\n" +
                "This link will expire in 15 minutes.");
        
        emailSender.send(message);
    }
} 