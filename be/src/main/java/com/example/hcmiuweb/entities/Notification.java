package com.example.hcmiuweb.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User recipient; // Renamed from 'user' to 'recipient'

    @Column(nullable = false)
    private String type; // e.g., "NEW_VIDEO", "NEW_COMMENT"

    @Column(nullable = false)
    private String message;
    
    @Column
    private String link; // Added link field for navigation

    @ManyToOne
    @JoinColumn(name = "related_video_id")
    private Video relatedVideo; // Optional: may be null

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean isRead;

    // Constructors
    public Notification() {}

    public Notification(User recipient, String type, String message, String link, Video relatedVideo, LocalDateTime createdAt, boolean isRead) {
        this.recipient = recipient;
        this.type = type;
        this.message = message;
        this.link = link;
        this.relatedVideo = relatedVideo;
        this.createdAt = createdAt;
        this.isRead = isRead;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public User getRecipient() {
        return recipient;
    }
    public void setRecipient(User recipient) {
        this.recipient = recipient;
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

    public Video getRelatedVideo() {
        return relatedVideo;
    }
    public void setRelatedVideo(Video relatedVideo) {
        this.relatedVideo = relatedVideo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isRead() {
        return isRead;
    }
    public void setRead(boolean isRead) {
        this.isRead = isRead;
    }
}
