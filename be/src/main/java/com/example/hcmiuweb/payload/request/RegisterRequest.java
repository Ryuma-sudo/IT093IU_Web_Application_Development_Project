package com.example.hcmiuweb.payload.request;

import jakarta.validation.constraints.*;
import java.util.Set;

public class RegisterRequest {
        @NotBlank @Size(min=3, max=20)
        private String username;

        @NotBlank @Size(max=50) @Email
        private String email;

        @NotBlank @Size(min=6, max=40)
        private String password;

        private Set<String> role;

        public String getUsername() { return username; }
        public void setUsername(String u) { this.username = u; }
        public String getEmail() { return email; }
        public void setEmail(String e) { this.email = e; }
        public String getPassword() { return password; }
        public void setPassword(String p) { this.password = p; }
        public Set<String> getRole() { return role; }
        public void setRole(Set<String> role) { this.role = role; }
}