package com.example.hcmiuweb.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "VideoTag")
public class VideoTag {
    @EmbeddedId
    private VideoTagId id;

    @ManyToOne
    @MapsId("videoId")
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    // Constructors
    public VideoTag() {}

    public VideoTag(Video video, Tag tag) {
        this.video = video;
        this.tag = tag;
        this.id = new VideoTagId(video.getId(), tag.getId());
    }

    // Getters & Setters
    public VideoTagId getId() {
        return id;
    }
    public void setId(VideoTagId id) {
        this.id = id;
    }

    public Video getVideo() {
        return video;
    }
    public void setVideo(Video video) {
        this.video = video;
    }

    public Tag getTag() {
        return tag;
    }
    public void setTag(Tag tag) {
        this.tag = tag;
    }
}
