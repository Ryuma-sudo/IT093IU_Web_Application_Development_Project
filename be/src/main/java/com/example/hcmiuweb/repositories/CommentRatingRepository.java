package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.CommentRating;
import com.example.hcmiuweb.entities.CommentRatingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRatingRepository extends JpaRepository<CommentRating, CommentRatingId> {
    List<CommentRating> findByComment_Id(Long commentId);
    List<CommentRating> findByUser_Id(Long userId);
    Optional<CommentRating> findByUser_IdAndComment_Id(Long userId, Long commentId);
    long countByComment_IdAndRating(Long commentId, int rating);
}
