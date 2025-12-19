package com.example.hcmiuweb.dtos;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long id;
    private Long videoId;
    private Long userId;
    private String username;
    private String userAvatar;
    private String content;
    private LocalDateTime createdAt;
    private Long likes;
    private Long dislikes;

    // Default constructor
    public CommentDTO() {}

    // Constructor with fields
    public CommentDTO(Long id, Long videoId, Long userId, String username, 
                     String userAvatar, String content, LocalDateTime createdAt,
                     Long likes, Long dislikes) {
        this.id = id;
        this.videoId = videoId;
        this.userId = userId;
        this.username = username;
        this.userAvatar = userAvatar;
        this.content = content;
        this.createdAt = createdAt;
        this.likes = likes;
        this.dislikes = dislikes;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
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

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public Long getDislikes() {
        return dislikes;
    }

    public void setDislikes(Long dislikes) {
        this.dislikes = dislikes;
    }
}