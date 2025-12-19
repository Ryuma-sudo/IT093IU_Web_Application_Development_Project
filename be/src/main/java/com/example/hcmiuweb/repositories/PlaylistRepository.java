package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.Playlist;
import com.example.hcmiuweb.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByUser(User user);
    List<Playlist> findByUserAndIsPublic(User user, boolean isPublic);
    List<Playlist> findByIsPublic(boolean isPublic);
}