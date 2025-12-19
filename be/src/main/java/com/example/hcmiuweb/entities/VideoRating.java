package com.example.hcmiuweb.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "VideoRating")
public class VideoRating {
    @EmbeddedId
    private VideoRatingId id;

    @JsonIgnore
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne
    @MapsId("videoId")
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    @Column(nullable = false)
    private int rating; // +1 for like, -1 for dislike

    // Constructors
    public VideoRating() {}

    public VideoRating(User user, Video video, int rating) {
        this.user = user;
        this.video = video;
        this.rating = rating;
        this.id = new VideoRatingId(user.getId(), video.getId());
    }

    // Getters & Setters - keep as they are

    public VideoRatingId getId() {
        return id;
    }

    public void setId(VideoRatingId id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }
}