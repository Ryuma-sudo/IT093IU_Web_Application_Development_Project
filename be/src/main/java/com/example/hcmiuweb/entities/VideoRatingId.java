package com.example.hcmiuweb.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VideoRatingId implements Serializable {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "video_id")
    private Long videoId;

    // Constructors
    public VideoRatingId() {}

    public VideoRatingId(Long userId, Long videoId) {
        this.userId = userId;
        this.videoId = videoId;
    }

    // Getters & Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getVideoId() {
        return videoId;
    }
    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VideoRatingId)) return false;
        VideoRatingId that = (VideoRatingId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(videoId, that.videoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, videoId);
    }
}
