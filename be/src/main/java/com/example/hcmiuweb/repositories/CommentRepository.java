package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByVideo_Id(Long videoId);
    List<Comment> findByUser_Id(Long userId);
    List<Comment> findByVideo_IdAndParentCommentIsNull(Long videoId);
    List<Comment> findByParentComment_Id(Long parentCommentId);
}