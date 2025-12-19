package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.entities.Video;
import com.example.hcmiuweb.entities.WatchList;
import com.example.hcmiuweb.repositories.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Service
public class WatchListService {
    private final WatchListRepository watchListRepository;

    @Autowired
    public WatchListService(WatchListRepository watchListRepository) {
        this.watchListRepository = watchListRepository;
    }

    @Transactional(readOnly = true)
    public Optional<WatchList> findWatchListByUser(User user) {
        return watchListRepository.findByUser(user);
    }
    
    @Transactional
    public WatchList getOrCreateWatchListForUser(User user) {
        return watchListRepository.findByUser(user)
                .orElseGet(() -> {
                    WatchList newWatchList = new WatchList();
                    newWatchList.setUser(user);
                    newWatchList.setCreatedAt(LocalDateTime.now());
                    newWatchList.setUpdatedAt(LocalDateTime.now());
                    return watchListRepository.save(newWatchList);
                });
    }    @Transactional
    public WatchList addVideoToWatchList(User user, Video video) {
        WatchList watchList = getOrCreateWatchListForUser(user);
        watchList.addVideo(video);
        watchList.setUpdatedAt(LocalDateTime.now());
        return watchListRepository.save(watchList);
    }
    
    @Transactional
    public WatchList removeVideoFromWatchList(User user, Video video) {
        Optional<WatchList> watchListOpt = findWatchListByUser(user);
        if (watchListOpt.isPresent()) {
            WatchList watchList = watchListOpt.get();
            // Use an improved removal approach that ensures proper equals/hashCode usage
            boolean removed = watchList.getVideos().removeIf(v -> v.getId().equals(video.getId()));
            if (removed) {
                watchList.setUpdatedAt(LocalDateTime.now());
                return watchListRepository.save(watchList);
            }
        }
        return null;
    }    @Transactional
    public void clearWatchList(User user) {
        Optional<WatchList> watchListOpt = findWatchListByUser(user);
        if (watchListOpt.isPresent()) {
            WatchList watchList = watchListOpt.get();
            watchList.getVideos().clear();
            watchList.setUpdatedAt(LocalDateTime.now());
            watchListRepository.save(watchList);
        }
    }
      @Transactional(readOnly = true)
    public Set<Video> getWatchListVideos(User user) {
        Optional<WatchList> watchList = findWatchListByUser(user);
        return watchList.map(WatchList::getVideos).orElse(Set.of());
    }
    
    @Transactional(readOnly = true)

    public boolean isVideoInWatchList(User user, Video video) {
        Optional<WatchList> watchList = findWatchListByUser(user);
        if (watchList.isPresent()) {
            Long videoId = video.getId();
            // More explicit check using ID comparison
            return watchList.get().getVideos().stream()
                .anyMatch(v -> v.getId().equals(videoId));
        }
        return false;
    }
}
