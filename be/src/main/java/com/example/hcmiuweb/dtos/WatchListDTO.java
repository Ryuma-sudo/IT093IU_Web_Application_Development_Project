package com.example.hcmiuweb.dtos;

import java.time.LocalDateTime;
import java.util.List;

public class WatchListDTO {
    private Long id;
    private Long userId;
    private String username;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<VideoDTO> videos;
    private int videoCount;
    
    // Default constructor
    public WatchListDTO() {}
    
    // Constructor with fields
    public WatchListDTO(Long id, Long userId, String username, 
                       LocalDateTime createdAt, LocalDateTime updatedAt, int videoCount) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.videoCount = videoCount;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public List<VideoDTO> getVideos() {
        return videos;
    }
    
    public void setVideos(List<VideoDTO> videos) {
        this.videos = videos;
    }
    
    public int getVideoCount() {
        return videoCount;
    }
    
    public void setVideoCount(int videoCount) {
        this.videoCount = videoCount;
    }
}
