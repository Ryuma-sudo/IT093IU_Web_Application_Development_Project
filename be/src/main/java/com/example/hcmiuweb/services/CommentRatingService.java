package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.Comment;
import com.example.hcmiuweb.entities.CommentRating;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.payload.request.CommentRatingRequest;
import com.example.hcmiuweb.payload.response.CommentRatingResponse;
import com.example.hcmiuweb.repositories.CommentRatingRepository;
import com.example.hcmiuweb.repositories.CommentRepository;
import com.example.hcmiuweb.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentRatingService {
    
    private final CommentRatingRepository commentRatingRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    @Autowired
    public CommentRatingService(
            CommentRatingRepository commentRatingRepository,
            CommentRepository commentRepository,
            UserRepository userRepository,
            NotificationService notificationService) {
        this.commentRatingRepository = commentRatingRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }    
    
    @Transactional
    public CommentRatingResponse rateComment(CommentRatingRequest ratingRequest) {
        User user = userRepository.findById(ratingRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + ratingRequest.getUserId()));
        
        Comment comment = commentRepository.findById(ratingRequest.getCommentId())
                .orElseThrow(() -> new RuntimeException("Comment not found with ID: " + ratingRequest.getCommentId()));
        
        // Check if user already rated this comment - use the method that avoids session conflicts
        Optional<CommentRating> existingRating = commentRatingRepository.findByUser_IdAndComment_Id(user.getId(), comment.getId());
        
        // Handle case where the rating already exists
        if (existingRating.isPresent()) {
            CommentRating rating = existingRating.get();
            
            // If the same rating is clicked, remove it (toggle behavior)
            if (rating.getRating() == ratingRequest.getRating()) {
                // Remove the rating from comment to update counts
                comment.removeRating(rating);
                // Delete from DB
                commentRatingRepository.delete(rating);
                
                // Save the comment to update its state
                commentRepository.save(comment);
                
                // Create response
                CommentRatingResponse response = new CommentRatingResponse();
                response.setLikes(comment.getLikesCount());
                response.setDislikes(comment.getDislikesCount());
                
                return response;
            } else {
                // Just update the rating value
                rating.setRating(ratingRequest.getRating());
                
                // Update the rating
                CommentRating savedRating = commentRatingRepository.save(rating);
                
                // Create response
                CommentRatingResponse response = new CommentRatingResponse();
                response.setLikes(comment.getLikesCount());
                response.setDislikes(comment.getDislikesCount());
                
                // Send notification about rating change
                sendRatingNotification(user, comment, savedRating);
                
                return response;
            }
        } else {
            // Create new rating
            CommentRating rating = new CommentRating(user, comment, ratingRequest.getRating());
            // Save the CommentRating explicitly
            CommentRating savedRating = commentRatingRepository.save(rating);
            
            // Update the comment's rating counts (if not handled by cascade)
            comment.addRating(savedRating);
            commentRepository.save(comment);
            
            // Send notification about the new rating
            sendRatingNotification(user, comment, savedRating);
            
            CommentRatingResponse response = new CommentRatingResponse();
            response.setLikes(comment.getLikesCount());
            response.setDislikes(comment.getDislikesCount());
            
            return response;
        }
    }
    
    @Transactional
    public CommentRatingResponse getCommentRating(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found with ID: " + commentId));
        
        CommentRatingResponse response = new CommentRatingResponse();
        response.setLikes(comment.getLikesCount());
        response.setDislikes(comment.getDislikesCount());
        
        return response;
    }
    
    @Transactional
    public void deleteRating(Long userId, Long commentId) {
        Optional<CommentRating> ratingOpt = commentRatingRepository.findByUser_IdAndComment_Id(userId, commentId);
        ratingOpt.ifPresent(rating -> {
            Comment comment = rating.getComment();
            comment.removeRating(rating);
            commentRatingRepository.delete(rating);
            commentRepository.save(comment);
        });
    }

    // Helper method to send notification for ratings
    private void sendRatingNotification(User user, Comment comment, CommentRating rating) {
        // Only send notification if the rater is not the comment owner
        if (!user.getId().equals(comment.getUser().getId())) {
            String action = rating.getRating() > 0 ? "liked" : "disliked";
            String message = String.format(
                    "%s %s your comment on: %s", 
                    user.getUsername(),
                    action,
                    comment.getVideo().getTitle()
            );
            
            notificationService.createNotification(
                    comment.getUser(),
                    "COMMENT_RATING",
                    message,
                    "/watch/" + comment.getVideo().getId(),
                    comment.getVideo()
            );
        }
    }
}
