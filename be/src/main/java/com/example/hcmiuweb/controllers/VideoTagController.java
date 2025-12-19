package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.dtos.VideoTagDTO;
import com.example.hcmiuweb.entities.Tag;
import com.example.hcmiuweb.entities.Video;
import com.example.hcmiuweb.entities.VideoTag;
import com.example.hcmiuweb.entities.VideoTagId;
import com.example.hcmiuweb.services.TagService;
import com.example.hcmiuweb.services.VideoService;
import com.example.hcmiuweb.services.VideoTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/video-tags")
public class VideoTagController {
    
    private final VideoTagService videoTagService;
    private final VideoService videoService;
    private final TagService tagService;
    
    @Autowired
    public VideoTagController(VideoTagService videoTagService, VideoService videoService, TagService tagService) {
        this.videoTagService = videoTagService;
        this.videoService = videoService;
        this.tagService = tagService;
    }
    
    @GetMapping("/video/{videoId}")
    public ResponseEntity<List<VideoTagDTO>> getTagsByVideoId(@PathVariable Long videoId) {
        Optional<Video> video = videoService.findVideoById(videoId);
        if (video.isPresent()) {
            List<VideoTag> videoTags = videoTagService.findVideoTagsByVideo(video.get());
            List<VideoTagDTO> videoTagDTOs = videoTags.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(videoTagDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<List<VideoTagDTO>> getVideosByTagId(@PathVariable Long tagId) {
        Optional<Tag> tag = tagService.findTagById(tagId);
        if (tag.isPresent()) {
            List<VideoTag> videoTags = videoTagService.findVideoTagsByTag(tag.get());
            List<VideoTagDTO> videoTagDTOs = videoTags.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(videoTagDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<VideoTagDTO> addTagToVideo(@RequestBody VideoTagDTO videoTagDTO) {
        Optional<Video> video = videoService.findVideoById(videoTagDTO.getVideoId());
        Tag tag;
        
        // Find or create the tag
        if (videoTagDTO.getTagId() != null) {
            Optional<Tag> existingTag = tagService.findTagById(videoTagDTO.getTagId());
            if (!existingTag.isPresent()) {
                return ResponseEntity.badRequest().build();
            }
            tag = existingTag.get();
        } else if (videoTagDTO.getTagName() != null && !videoTagDTO.getTagName().isEmpty()) {
            tag = tagService.getOrCreateTag(videoTagDTO.getTagName());
        } else {
            return ResponseEntity.badRequest().build();
        }
        
        if (video.isPresent()) {
            // Check if the association already exists
            if (videoTagService.existsByVideoAndTag(video.get(), tag)) {
                // Association already exists, return existing data
                VideoTagDTO dto = new VideoTagDTO(
                        video.get().getId(),
                        tag.getId(),
                        tag.getName()
                );
                return ResponseEntity.ok(dto);
            }
            
            // Create new video-tag association
            VideoTag videoTag = new VideoTag();
            videoTag.setVideo(video.get());
            videoTag.setTag(tag);
            videoTag.setId(new VideoTagId(video.get().getId(), tag.getId()));
            
            VideoTag savedVideoTag = videoTagService.saveVideoTag(videoTag);
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedVideoTag));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{videoId}/{tagId}")
    public ResponseEntity<Void> removeTagFromVideo(
            @PathVariable Long videoId,
            @PathVariable Long tagId) {
        Optional<Video> video = videoService.findVideoById(videoId);
        Optional<Tag> tag = tagService.findTagById(tagId);
        
        if (video.isPresent() && tag.isPresent()) {
            videoTagService.deleteVideoTagByVideoAndTag(video.get(), tag.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Helper method to convert VideoTag entity to VideoTagDTO
    private VideoTagDTO convertToDTO(VideoTag videoTag) {
        return new VideoTagDTO(
                videoTag.getVideo().getId(),
                videoTag.getTag().getId(),
                videoTag.getTag().getName()
        );
    }
}