package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.Playlist;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {
    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public List<Playlist> findAllPlaylists() {
        return playlistRepository.findAll();
    }

    public Optional<Playlist> findPlaylistById(Long id) {
        return playlistRepository.findById(id);
    }

    public List<Playlist> findPlaylistsByUser(User user) {
        return playlistRepository.findByUser(user);
    }

    public List<Playlist> findPublicPlaylistsByUser(User user) {
        return playlistRepository.findByUserAndIsPublic(user, true);
    }

    public List<Playlist> findAllPublicPlaylists() {
        return playlistRepository.findByIsPublic(true);
    }

    public Playlist savePlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    public void deletePlaylist(Long id) {
        playlistRepository.deleteById(id);
    }
}