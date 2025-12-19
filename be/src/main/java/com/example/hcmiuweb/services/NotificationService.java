package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.Notification;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.entities.Video;
import com.example.hcmiuweb.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> findAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> findNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public List<Notification> findNotificationsByRecipient(User recipient) {
        return notificationRepository.findByRecipientOrderByCreatedAtDesc(recipient);
    }

    public List<Notification> findUnreadNotificationsByRecipient(User recipient) {
        return notificationRepository.findByRecipientAndIsRead(recipient, false);
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification markAsRead(Long id) {
        Optional<Notification> notification = notificationRepository.findById(id);
        if (notification.isPresent()) {
            Notification n = notification.get();
            n.setRead(true);
            return notificationRepository.save(n);
        }
        return null;
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public long countUnreadNotifications(User recipient) {
        return notificationRepository.countByRecipientAndIsRead(recipient, false);
    }

    public Notification createNotification(User recipient, String type, String message, String link, Video relatedVideo) {
        Notification notification = new Notification(
            recipient,
            type,
            message,
            link,
            relatedVideo,
            LocalDateTime.now(),
            false
        );

        return notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByRecipient_IdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUserUnreadNotifications(Long userId) {
        return notificationRepository.findByRecipient_IdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }

    public void markAllAsRead(Long userId) {
        List<Notification> unreadNotifications = notificationRepository.findByRecipient_IdAndIsReadFalseOrderByCreatedAtDesc(userId);
        unreadNotifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }
}