package com.example.hcmiuweb.dtos;

public class VideoTagDTO {
    private Long videoId;
    private Long tagId;
    private String tagName;
    
    // Default constructor
    public VideoTagDTO() {}
    
    // Constructor with fields
    public VideoTagDTO(Long videoId, Long tagId, String tagName) {
        this.videoId = videoId;
        this.tagId = tagId;
        this.tagName = tagName;
    }
    
    // Getters and setters
    public Long getVideoId() {
        return videoId;
    }
    
    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }
    
    public Long getTagId() {
        return tagId;
    }
    
    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }
    
    public String getTagName() {
        return tagName;
    }
    
    public void setTagName(String tagName) {
        this.tagName = tagName;
    }
}