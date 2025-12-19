package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.dtos.NotificationDTO;
import com.example.hcmiuweb.entities.Notification;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.services.NotificationService;
import com.example.hcmiuweb.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/notifications")
public class NotificationController {
    
    private final NotificationService notificationService;
    private final UserService userService;
    
    @Autowired
    public NotificationController(NotificationService notificationService, UserService userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }
    
    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getAllNotifications() {
        List<Notification> notifications = notificationService.findAllNotifications();
        List<NotificationDTO> notificationDTOs = notifications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(notificationDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<NotificationDTO> getNotificationById(@PathVariable Long id) {
        Optional<Notification> notification = notificationService.findNotificationById(id);
        return notification.map(n -> ResponseEntity.ok(convertToDTO(n)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByUserId(@PathVariable Long userId) {
        Optional<User> user = userService.findUserById(userId);
        if (user.isPresent()) {
            List<Notification> notifications = notificationService.findNotificationsByRecipient(user.get());
            List<NotificationDTO> notificationDTOs = notifications.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(notificationDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotificationsByUserId(@PathVariable Long userId) {
        Optional<User> user = userService.findUserById(userId);
        if (user.isPresent()) {
            List<Notification> notifications = notificationService.findUnreadNotificationsByRecipient(user.get());
            List<NotificationDTO> notificationDTOs = notifications.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(notificationDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/user/{userId}/count-unread")
    public ResponseEntity<Long> countUnreadNotificationsByUserId(@PathVariable Long userId) {
        Optional<User> user = userService.findUserById(userId);
        if (user.isPresent()) {
            long count = notificationService.countUnreadNotifications(user.get());
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(@RequestBody NotificationDTO notificationDTO) {
        Optional<User> recipient = userService.findUserById(notificationDTO.getRecipientId());
        
        if (recipient.isPresent()) {
            Notification notification = new Notification();
            notification.setRecipient(recipient.get());
            notification.setType(notificationDTO.getType());
            notification.setMessage(notificationDTO.getMessage());
            notification.setLink(notificationDTO.getLink());
            notification.setRead(false);
            notification.setCreatedAt(LocalDateTime.now());
            
            Notification savedNotification = notificationService.saveNotification(notification);
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedNotification));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/mark-read")
    public ResponseEntity<NotificationDTO> markNotificationAsRead(@PathVariable Long id) {
        Notification readNotification = notificationService.markAsRead(id);
        if (readNotification != null) {
            return ResponseEntity.ok(convertToDTO(readNotification));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        if (notificationService.findNotificationById(id).isPresent()) {
            notificationService.deleteNotification(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Helper method to convert Notification entity to NotificationDTO
    private NotificationDTO convertToDTO(Notification notification) {
        return new NotificationDTO(
                notification.getId(),
                notification.getRecipient().getId(),
                notification.getType(),
                notification.getMessage(),
                notification.getLink(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }
}