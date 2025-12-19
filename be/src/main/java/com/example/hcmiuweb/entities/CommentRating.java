package com.example.hcmiuweb.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "CommentRating")
public class CommentRating {
    @EmbeddedId
    private CommentRatingId id;

    @JsonIgnore
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne
    @MapsId("commentId")
    @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;

    @Column(nullable = false)
    private int rating; // +1 for like, -1 for dislike

    // Constructors
    public CommentRating() {}

    public CommentRating(User user, Comment comment, int rating) {
        this.user = user;
        this.comment = comment;
        this.rating = rating;
        this.id = new CommentRatingId(user.getId(), comment.getId());
    }

    // Getters & Setters
    public CommentRatingId getId() {
        return id;
    }

    public void setId(CommentRatingId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
