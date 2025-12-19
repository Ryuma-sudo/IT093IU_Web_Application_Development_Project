package com.example.hcmiuweb.dtos;

import java.time.LocalDateTime;

public class NotificationDTO {
    private Long id;
    private Long recipientId;
    private String type;
    private String message;
    private String link;
    private boolean isRead;
    private LocalDateTime createdAt;
    
    // Default constructor
    public NotificationDTO() {}
    
    // Constructor with fields
    public NotificationDTO(Long id, Long recipientId, String type, 
                          String message, String link, boolean isRead, 
                          LocalDateTime createdAt) {
        this.id = id;
        this.recipientId = recipientId;
        this.type = type;
        this.message = message;
        this.link = link;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getRecipientId() {
        return recipientId;
    }
    
    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getLink() {
        return link;
    }
    
    public void setLink(String link) {
        this.link = link;
    }
    
    public boolean isRead() {
        return isRead;
    }
    
    public void setRead(boolean isRead) {
        this.isRead = isRead;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}