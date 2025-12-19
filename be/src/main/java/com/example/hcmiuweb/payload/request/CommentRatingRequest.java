package com.example.hcmiuweb.payload.request;

import jakarta.validation.constraints.NotNull;

public class CommentRatingRequest {
    @NotNull
    private Long userId;
    
    @NotNull
    private Long commentId;
    
    @NotNull
    private int rating; // +1 for like, -1 for dislike
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getCommentId() {
        return commentId;
    }
    
    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }
    
    public int getRating() {
        return rating;
    }
    
    public void setRating(int rating) {
        this.rating = rating;
    }
}
