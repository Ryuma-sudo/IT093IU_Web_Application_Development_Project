package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.dtos.PlaylistDTO;
import com.example.hcmiuweb.dtos.VideoDTO;
import com.example.hcmiuweb.entities.Playlist;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.services.PlaylistService;
import com.example.hcmiuweb.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/playlists")
public class PlaylistController {
    
    private final PlaylistService playlistService;
    private final UserService userService;
    
    @Autowired
    public PlaylistController(PlaylistService playlistService, UserService userService) {
        this.playlistService = playlistService;
        this.userService = userService;
    }
    
    @GetMapping
    public ResponseEntity<List<PlaylistDTO>> getAllPlaylists() {
        List<Playlist> playlists = playlistService.findAllPublicPlaylists();
        List<PlaylistDTO> playlistDTOs = playlists.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(playlistDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PlaylistDTO> getPlaylistById(@PathVariable Long id) {
        Optional<Playlist> playlist = playlistService.findPlaylistById(id);
        return playlist.map(p -> ResponseEntity.ok(convertToDTO(p)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PlaylistDTO>> getPlaylistsByUserId(@PathVariable Long userId) {
        Optional<User> user = userService.findUserById(userId);
        if (user.isPresent()) {
            List<Playlist> playlists = playlistService.findPlaylistsByUser(user.get());
            List<PlaylistDTO> playlistDTOs = playlists.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(playlistDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/user/{userId}/public")
    public ResponseEntity<List<PlaylistDTO>> getPublicPlaylistsByUserId(@PathVariable Long userId) {
        Optional<User> user = userService.findUserById(userId);
        if (user.isPresent()) {
            List<Playlist> playlists = playlistService.findPublicPlaylistsByUser(user.get());
            List<PlaylistDTO> playlistDTOs = playlists.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(playlistDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<PlaylistDTO> createPlaylist(@RequestBody PlaylistDTO playlistDTO) {
        Optional<User> user = userService.findUserById(playlistDTO.getUserId());
        
        if (user.isPresent()) {
            Playlist playlist = new Playlist();
            playlist.setName(playlistDTO.getName());
            playlist.setDescription(playlistDTO.getDescription());
            playlist.setUser(user.get());
            playlist.setPublic(playlistDTO.isPublic());
            playlist.setCreatedAt(LocalDateTime.now());
            playlist.setUpdatedAt(LocalDateTime.now());
            
            Playlist savedPlaylist = playlistService.savePlaylist(playlist);
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedPlaylist));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PlaylistDTO> updatePlaylist(@PathVariable Long id, @RequestBody PlaylistDTO playlistDTO) {
        Optional<Playlist> existingPlaylist = playlistService.findPlaylistById(id);
        
        if (existingPlaylist.isPresent()) {
            Playlist playlist = existingPlaylist.get();
            playlist.setName(playlistDTO.getName());
            playlist.setDescription(playlistDTO.getDescription());
            playlist.setPublic(playlistDTO.isPublic());
            playlist.setUpdatedAt(LocalDateTime.now());
            
            Playlist updatedPlaylist = playlistService.savePlaylist(playlist);
            return ResponseEntity.ok(convertToDTO(updatedPlaylist));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        if (playlistService.findPlaylistById(id).isPresent()) {
            playlistService.deletePlaylist(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Helper method to convert Playlist entity to PlaylistDTO
    private PlaylistDTO convertToDTO(Playlist playlist) {
        PlaylistDTO dto = new PlaylistDTO(
                playlist.getId(),
                playlist.getName(),
                playlist.getDescription(),
                playlist.getUser().getId(),
                playlist.getUser().getUsername(),
                playlist.isPublic(),
                playlist.getCreatedAt(),
                playlist.getUpdatedAt(),
                0  // Video count will be set based on actual videos if implemented
        );
        
        // Set empty video list by default
        dto.setVideos(Collections.emptyList());
        
        return dto;
    }
}