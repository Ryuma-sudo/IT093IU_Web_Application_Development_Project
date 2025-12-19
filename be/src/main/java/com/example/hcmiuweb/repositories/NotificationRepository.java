package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.Notification;
import com.example.hcmiuweb.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientOrderByCreatedAtDesc(User recipient);
    List<Notification> findByRecipientAndIsRead(User recipient, boolean isRead);
    List<Notification> findByRecipient_IdOrderByCreatedAtDesc(Long recipientId);
    List<Notification> findByRecipient_IdAndIsReadFalseOrderByCreatedAtDesc(Long recipientId);
    long countByRecipientAndIsRead(User recipient, boolean isRead);
}