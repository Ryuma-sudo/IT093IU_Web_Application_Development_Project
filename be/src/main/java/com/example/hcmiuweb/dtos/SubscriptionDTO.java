package com.example.hcmiuweb.dtos;

import java.time.LocalDateTime;

public class SubscriptionDTO {
    private Long subscriberId;
    private String subscriberUsername;
    private String subscriberAvatar;
    private Long creatorId;
    private String creatorUsername;
    private String creatorAvatar;
    private LocalDateTime subscribedAt;
    
    // Default constructor
    public SubscriptionDTO() {}
    
    // Constructor with fields
    public SubscriptionDTO(Long subscriberId, String subscriberUsername, String subscriberAvatar,
                           Long creatorId, String creatorUsername, String creatorAvatar,
                           LocalDateTime subscribedAt) {
        this.subscriberId = subscriberId;
        this.subscriberUsername = subscriberUsername;
        this.subscriberAvatar = subscriberAvatar;
        this.creatorId = creatorId;
        this.creatorUsername = creatorUsername;
        this.creatorAvatar = creatorAvatar;
        this.subscribedAt = subscribedAt;
    }
    
    // Getters and setters
    public Long getSubscriberId() {
        return subscriberId;
    }
    
    public void setSubscriberId(Long subscriberId) {
        this.subscriberId = subscriberId;
    }
    
    public String getSubscriberUsername() {
        return subscriberUsername;
    }
    
    public void setSubscriberUsername(String subscriberUsername) {
        this.subscriberUsername = subscriberUsername;
    }
    
    public String getSubscriberAvatar() {
        return subscriberAvatar;
    }
    
    public void setSubscriberAvatar(String subscriberAvatar) {
        this.subscriberAvatar = subscriberAvatar;
    }
    
    public Long getCreatorId() {
        return creatorId;
    }
    
    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }
    
    public String getCreatorUsername() {
        return creatorUsername;
    }
    
    public void setCreatorUsername(String creatorUsername) {
        this.creatorUsername = creatorUsername;
    }
    
    public String getCreatorAvatar() {
        return creatorAvatar;
    }
    
    public void setCreatorAvatar(String creatorAvatar) {
        this.creatorAvatar = creatorAvatar;
    }
    
    public LocalDateTime getSubscribedAt() {
        return subscribedAt;
    }
    
    public void setSubscribedAt(LocalDateTime subscribedAt) {
        this.subscribedAt = subscribedAt;
    }
}