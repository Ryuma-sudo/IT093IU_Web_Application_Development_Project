package com.example.hcmiuweb.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlaylistVideoId implements Serializable {
    @Column(name = "playlist_id")
    private Long playlistId;

    @Column(name = "video_id")
    private Long videoId;

    // Constructors
    public PlaylistVideoId() {}

    public PlaylistVideoId(Long playlistId, Long videoId) {
        this.playlistId = playlistId;
        this.videoId = videoId;
    }

    // Getters & Setters
    public Long getPlaylistId() {
        return playlistId;
    }
    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
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
        if (!(o instanceof PlaylistVideoId)) return false;
        PlaylistVideoId that = (PlaylistVideoId) o;
        return Objects.equals(playlistId, that.playlistId) &&
                Objects.equals(videoId, that.videoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playlistId, videoId);
    }
}
