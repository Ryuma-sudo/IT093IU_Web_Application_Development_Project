package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.dtos.TagDTO;
import com.example.hcmiuweb.entities.Tag;
import com.example.hcmiuweb.services.TagService;
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
@RequestMapping("/api/tags")
public class TagController {
    
    private final TagService tagService;
    private final VideoTagService videoTagService;
    
    @Autowired
    public TagController(TagService tagService, VideoTagService videoTagService) {
        this.tagService = tagService;
        this.videoTagService = videoTagService;
    }
    
    @GetMapping
    public ResponseEntity<List<TagDTO>> getAllTags() {
        List<Tag> tags = tagService.findAllTags();
        List<TagDTO> tagDTOs = tags.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tagDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TagDTO> getTagById(@PathVariable Long id) {
        Optional<Tag> tag = tagService.findTagById(id);
        return tag.map(t -> ResponseEntity.ok(convertToDTO(t)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<TagDTO> getTagByName(@PathVariable String name) {
        Optional<Tag> tag = tagService.findTagByName(name);
        return tag.map(t -> ResponseEntity.ok(convertToDTO(t)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<TagDTO> createTag(@RequestBody TagDTO tagDTO) {
        // Check if tag already exists
        Optional<Tag> existingTag = tagService.findTagByName(tagDTO.getName());
        if (existingTag.isPresent()) {
            return ResponseEntity.ok(convertToDTO(existingTag.get()));
        }
        
        // Create new tag
        Tag tag = new Tag();
        tag.setName(tagDTO.getName());
        
        Tag savedTag = tagService.saveTag(tag);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedTag));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TagDTO> updateTag(@PathVariable Long id, @RequestBody TagDTO tagDTO) {
        Optional<Tag> existingTag = tagService.findTagById(id);
        
        if (existingTag.isPresent()) {
            Tag tag = existingTag.get();
            tag.setName(tagDTO.getName());
            
            Tag updatedTag = tagService.saveTag(tag);
            return ResponseEntity.ok(convertToDTO(updatedTag));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        if (tagService.findTagById(id).isPresent()) {
            tagService.deleteTag(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Helper method to convert Tag entity to TagDTO
    private TagDTO convertToDTO(Tag tag) {
        // You could count videos using videoTagService if needed
        // long videoCount = videoTagRepository.countByTag(tag);
        
        // For simplicity, set video count to 0 for now
        return new TagDTO(tag.getId(), tag.getName(), 0);
    }
}