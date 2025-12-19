package com.example.hcmiuweb.dtos;

public class TagDTO {
    private Long id;
    private String name;
    private int videoCount;
    
    // Default constructor
    public TagDTO() {}
    
    // Constructor with fields
    public TagDTO(Long id, String name, int videoCount) {
        this.id = id;
        this.name = name;
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
    
    public int getVideoCount() {
        return videoCount;
    }
    
    public void setVideoCount(int videoCount) {
        this.videoCount = videoCount;
    }
}