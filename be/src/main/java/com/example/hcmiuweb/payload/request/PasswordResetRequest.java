package com.example.hcmiuweb.payload.request;

import jakarta.validation.constraints.NotBlank;

public class PasswordResetRequest {
    @NotBlank
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
} 