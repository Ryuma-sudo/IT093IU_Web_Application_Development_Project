package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.Tag;
import com.example.hcmiuweb.entities.Video;
import com.example.hcmiuweb.entities.VideoTag;
import com.example.hcmiuweb.entities.VideoTagId;
import com.example.hcmiuweb.repositories.VideoTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoTagService {
    private final VideoTagRepository videoTagRepository;

    @Autowired
    public VideoTagService(VideoTagRepository videoTagRepository) {
        this.videoTagRepository = videoTagRepository;
    }

    public List<VideoTag> findAllVideoTags() {
        return videoTagRepository.findAll();
    }

    public Optional<VideoTag> findVideoTagById(VideoTagId id) {
        return videoTagRepository.findById(id);
    }

    public List<VideoTag> findVideoTagsByVideo(Video video) {
        return videoTagRepository.findByVideo(video);
    }

    public List<VideoTag> findVideoTagsByTag(Tag tag) {
        return videoTagRepository.findByTag(tag);
    }

    public boolean existsByVideoAndTag(Video video, Tag tag) {
        return videoTagRepository.existsByVideoAndTag(video, tag);
    }

    public VideoTag saveVideoTag(VideoTag videoTag) {
        return videoTagRepository.save(videoTag);
    }

    public void deleteVideoTag(VideoTagId id) {
        videoTagRepository.deleteById(id);
    }

    public void deleteVideoTagByVideoAndTag(Video video, Tag tag) {
        VideoTagId id = new VideoTagId(video.getId(), tag.getId());
        videoTagRepository.deleteById(id);
    }
}