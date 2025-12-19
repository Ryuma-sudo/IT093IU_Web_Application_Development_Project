package com.example.hcmiuweb.dtos;

import com.example.hcmiuweb.entities.VideoRating;

public class RatingDTO {
    private Long userId;
    private Long videoId;
    private int rating;
    private String username;
    private String videoTitle;

    public RatingDTO() {}

    public static RatingDTO fromEntity(VideoRating rating) {
        RatingDTO dto = new RatingDTO();
        dto.setUserId(rating.getId().getUserId());
        dto.setVideoId(rating.getId().getVideoId());
        dto.setRating(rating.getRating());

        if (rating.getUser() != null) {
            dto.setUsername(rating.getUser().getUsername());
        }

        if (rating.getVideo() != null) {
            dto.setVideoTitle(rating.getVideo().getTitle());
        }

        return dto;
    }

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getVideoId() { return videoId; }
    public void setVideoId(Long videoId) { this.videoId = videoId; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getVideoTitle() { return videoTitle; }
    public void setVideoTitle(String videoTitle) { this.videoTitle = videoTitle; }
}