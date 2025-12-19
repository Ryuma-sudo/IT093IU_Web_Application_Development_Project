package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.payload.request.CommentRatingRequest;
import com.example.hcmiuweb.payload.response.CommentRatingResponse;
import com.example.hcmiuweb.payload.response.MessageResponse;
import com.example.hcmiuweb.services.CommentRatingService;
import com.example.hcmiuweb.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/comment-ratings")
public class CommentRatingController {
    
    private final CommentRatingService commentRatingService;
    
    @Autowired
    public CommentRatingController(CommentRatingService commentRatingService) {
        this.commentRatingService = commentRatingService;
    }
    
    @PostMapping
    public ResponseEntity<?> rateComment(@Valid @RequestBody CommentRatingRequest ratingRequest) {
        try {
            // Get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long authenticatedUserId = userDetails.getId();
            
            // Check if the userId in the request matches the authenticated user's ID
            if (ratingRequest.getUserId() != null && !ratingRequest.getUserId().equals(authenticatedUserId)) {
                return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Error: You can only rate with your own user ID"));
            }
            
            // Set the userId in the request to the authenticated user's ID
            ratingRequest.setUserId(authenticatedUserId);
            
            CommentRatingResponse ratingResponse = commentRatingService.rateComment(ratingRequest);
            return ResponseEntity.ok(ratingResponse);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{commentId}")
    public ResponseEntity<?> getCommentRating(@PathVariable Long commentId) {
        try {
            // Get the authenticated user if available
            Long userId = null;
            try {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (!authentication.getPrincipal().equals("anonymousUser")) {
                    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                    userId = userDetails.getId();
                }
            } catch (Exception ignored) {}
            
            CommentRatingResponse ratingResponse = commentRatingService.getCommentRating(commentId, userId);
            return ResponseEntity.ok(ratingResponse);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteRating(@PathVariable Long commentId) {
        try {
            // Get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long authenticatedUserId = userDetails.getId();
            
            commentRatingService.deleteRating(authenticatedUserId, commentId);
            return ResponseEntity.ok(new MessageResponse("Rating deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}
