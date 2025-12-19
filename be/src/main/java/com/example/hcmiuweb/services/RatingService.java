package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.entities.Video;
import com.example.hcmiuweb.entities.VideoRating;
import com.example.hcmiuweb.entities.VideoRatingId;
import com.example.hcmiuweb.repositories.RatingRepository;
import com.example.hcmiuweb.repositories.UserRepository;
import com.example.hcmiuweb.repositories.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RatingService {
    private static final Logger logger = LoggerFactory.getLogger(RatingService.class);

    private final RatingRepository ratingRepository;
    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    public RatingService(RatingRepository ratingRepository,
                         VideoRepository videoRepository,
                         UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.videoRepository = videoRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public VideoRating addRating(VideoRating rating) {
        try {
            // Check if user is null or has no ID
            if (rating.getUser() == null || rating.getUser().getId() == null) {
                throw new RuntimeException("User must be specified");
            }

            // Check if video is null or has no ID
            if (rating.getVideo() == null || rating.getVideo().getId() == null) {
                throw new RuntimeException("Video must be specified");
            }

            // Verify user exists
            User user = userRepository.findById(rating.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + rating.getUser().getId()));

            // Verify video exists
            Video video = videoRepository.findById(rating.getVideo().getId())
                    .orElseThrow(() -> new RuntimeException("Video not found with ID: " + rating.getVideo().getId()));

            // Create or update the rating
            VideoRatingId ratingId = new VideoRatingId(user.getId(), video.getId());

            // Check if rating already exists
            Optional<VideoRating> existingRating = ratingRepository.findById(ratingId);

            if (existingRating.isPresent()) {
                // Update existing rating
                VideoRating updatedRating = existingRating.get();
                updatedRating.setRating(rating.getRating());
                return ratingRepository.save(updatedRating);
            } else {
                // Create new rating
                rating.setUser(user);
                rating.setVideo(video);
                rating.setId(ratingId);
                return ratingRepository.save(rating);
            }
        } catch (Exception e) {
            logger.error("Error adding rating: ", e);
            throw e;
        }
    }

    @Transactional
    public void deleteRating(VideoRatingId id) {
        ratingRepository.deleteById(id);
    }
}