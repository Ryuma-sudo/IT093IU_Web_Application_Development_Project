package com.example.hcmiuweb.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Subscription")
public class Subscription {
    @EmbeddedId
    private SubscriptionId id;

    @ManyToOne
    @MapsId("subscriberId")
    @JoinColumn(name = "subscriber_id", nullable = false)
    private User subscriber;

    @ManyToOne
    @MapsId("channelUserId")
    @JoinColumn(name = "channel_user_id", nullable = false)
    private User channelUser;

    @Column(nullable = false)
    private LocalDateTime subscribedDate;

    // Constructors
    public Subscription() {}

    public Subscription(User subscriber, User channelUser, LocalDateTime subscribedDate) {
        this.subscriber = subscriber;
        this.channelUser = channelUser;
        this.subscribedDate = subscribedDate;
        this.id = new SubscriptionId(subscriber.getId(), channelUser.getId());
    }

    // Getters & Setters
    public SubscriptionId getId() {
        return id;
    }
    public void setId(SubscriptionId id) {
        this.id = id;
    }

    public User getSubscriber() {
        return subscriber;
    }
    public void setSubscriber(User subscriber) {
        this.subscriber = subscriber;
    }

    public User getChannelUser() {
        return channelUser;
    }
    public void setChannelUser(User channelUser) {
        this.channelUser = channelUser;
    }

    public LocalDateTime getSubscribedDate() {
        return subscribedDate;
    }
    public void setSubscribedDate(LocalDateTime subscribedDate) {
        this.subscribedDate = subscribedDate;
    }
}
