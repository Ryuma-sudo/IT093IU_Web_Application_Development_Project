package com.example.hcmiuweb.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VideoTagId implements Serializable {
    @Column(name = "video_id")
    private Long videoId;

    @Column(name = "tag_id")
    private Long tagId;

    // Constructors
    public VideoTagId() {}

    public VideoTagId(Long videoId, Long tagId) {
        this.videoId = videoId;
        this.tagId = tagId;
    }

    // Getters & Setters
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

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VideoTagId)) return false;
        VideoTagId that = (VideoTagId) o;
        return Objects.equals(videoId, that.videoId) &&
                Objects.equals(tagId, that.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(videoId, tagId);
    }
}
