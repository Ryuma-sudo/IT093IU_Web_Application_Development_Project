package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.dtos.SubscriptionDTO;
import com.example.hcmiuweb.entities.Subscription;
import com.example.hcmiuweb.entities.SubscriptionId;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.services.SubscriptionService;
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
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    
    private final SubscriptionService subscriptionService;
    private final UserService userService;
    
    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }
    
    @GetMapping
    public ResponseEntity<List<SubscriptionDTO>> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.findAllSubscriptions();
        List<SubscriptionDTO> subscriptionDTOs = subscriptions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(subscriptionDTOs);
    }
    
    @GetMapping("/subscriber/{subscriberId}")
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptionsBySubscriberId(@PathVariable Long subscriberId) {
        Optional<User> subscriber = userService.findUserById(subscriberId);
        if (subscriber.isPresent()) {
            List<Subscription> subscriptions = subscriptionService.findSubscriptionsBySubscriber(subscriber.get());
            List<SubscriptionDTO> subscriptionDTOs = subscriptions.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(subscriptionDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptionsByCreatorId(@PathVariable Long creatorId) {
        Optional<User> creator = userService.findUserById(creatorId);
        if (creator.isPresent()) {
            List<Subscription> subscriptions = subscriptionService.findSubscriptionsByCreator(creator.get());
            List<SubscriptionDTO> subscriptionDTOs = subscriptions.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(subscriptionDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/creator/{creatorId}/count")
    public ResponseEntity<Long> countSubscribersByCreatorId(@PathVariable Long creatorId) {
        Optional<User> creator = userService.findUserById(creatorId);
        if (creator.isPresent()) {
            long count = subscriptionService.countSubscribersByCreator(creator.get());
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkSubscription(
            @RequestParam Long subscriberId, 
            @RequestParam Long creatorId) {
        Optional<User> subscriber = userService.findUserById(subscriberId);
        Optional<User> creator = userService.findUserById(creatorId);
        
        if (subscriber.isPresent() && creator.isPresent()) {
            boolean isSubscribed = subscriptionService.isSubscribed(subscriber.get(), creator.get());
            return ResponseEntity.ok(isSubscribed);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<SubscriptionDTO> createSubscription(@RequestBody SubscriptionDTO subscriptionDTO) {
        Optional<User> subscriber = userService.findUserById(subscriptionDTO.getSubscriberId());
        Optional<User> creator = userService.findUserById(subscriptionDTO.getCreatorId());
        
        if (subscriber.isPresent() && creator.isPresent()) {
            // Check if subscription already exists
            if (subscriptionService.isSubscribed(subscriber.get(), creator.get())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            
            Subscription subscription = new Subscription();
            subscription.setSubscriber(subscriber.get());
            subscription.setChannelUser(creator.get());
            subscription.setId(
                new SubscriptionId(subscriber.get().getId(), creator.get().getId())
            );
            subscription.setSubscribedDate(LocalDateTime.now());
            
            Subscription savedSubscription = subscriptionService.saveSubscription(subscription);
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedSubscription));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{subscriberId}/{creatorId}")
    public ResponseEntity<Void> deleteSubscription(
            @PathVariable Long subscriberId, 
            @PathVariable Long creatorId) {
        Optional<User> subscriber = userService.findUserById(subscriberId);
        Optional<User> creator = userService.findUserById(creatorId);
        
        if (subscriber.isPresent() && creator.isPresent()) {
            subscriptionService.unsubscribe(subscriber.get(), creator.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Helper method to convert Subscription entity to SubscriptionDTO
    private SubscriptionDTO convertToDTO(Subscription subscription) {
        return new SubscriptionDTO(
                subscription.getSubscriber().getId(),
                subscription.getSubscriber().getUsername(),
                subscription.getSubscriber().getAvatar(),
                subscription.getChannelUser().getId(),
                subscription.getChannelUser().getUsername(),
                subscription.getChannelUser().getAvatar(),
                subscription.getSubscribedDate()
        );
    }
}