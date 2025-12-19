package com.example.hcmiuweb.dtos;

public class RatingRequestDTO {
    private int rating;
    private Long videoId;
    private Long userId;

    // Constructor
    public RatingRequestDTO() {}

    public RatingRequestDTO(int rating, Long videoId, Long userId) {
        this.rating = rating;
        this.videoId = videoId;
        this.userId = userId;
    }

    // Getters/setters

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getRating() {
        return rating;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getVideoId() {
        return videoId;
    }
}