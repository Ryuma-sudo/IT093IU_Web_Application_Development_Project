package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.Tag;
import com.example.hcmiuweb.entities.Video;
import com.example.hcmiuweb.entities.VideoTag;
import com.example.hcmiuweb.entities.VideoTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoTagRepository extends JpaRepository<VideoTag, VideoTagId> {
    List<VideoTag> findByVideo(Video video);
    List<VideoTag> findByTag(Tag tag);
    boolean existsByVideoAndTag(Video video, Tag tag);
}