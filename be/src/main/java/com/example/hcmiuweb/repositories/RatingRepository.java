package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.VideoRating;
import com.example.hcmiuweb.entities.VideoRatingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<VideoRating, VideoRatingId> {
    // Default methods from JpaRepository are sufficient for basic operations
}