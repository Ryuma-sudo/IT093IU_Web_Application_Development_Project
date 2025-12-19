package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.Tag;
import com.example.hcmiuweb.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    private final TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> findAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> findTagById(Long id) {
        return tagRepository.findById(id);
    }

    public Optional<Tag> findTagByName(String name) {
        return tagRepository.findByName(name);
    }

    public Tag getOrCreateTag(String name) {
        return tagRepository.findByName(name)
                .orElseGet(() -> {
                    Tag tag = new Tag();
                    tag.setName(name);
                    return tagRepository.save(tag);
                });
    }

    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}