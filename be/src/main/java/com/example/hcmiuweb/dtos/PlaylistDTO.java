package com.example.hcmiuweb.dtos;

import java.time.LocalDateTime;
import java.util.List;

public class PlaylistDTO {
    private Long id;
    private String name;
    private String description;
    private Long userId;
    private String username;
    private boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<VideoDTO> videos;
    private int videoCount;
    
    // Default constructor
    public PlaylistDTO() {}
    
    // Constructor with fields
    public PlaylistDTO(Long id, String name, String description, Long userId, 
                       String username, boolean isPublic, LocalDateTime createdAt,
                       LocalDateTime updatedAt, int videoCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.username = username;
        this.isPublic = isPublic;
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
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
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
    
    public boolean isPublic() {
        return isPublic;
    }
    
    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
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