package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.Subscription;
import com.example.hcmiuweb.entities.SubscriptionId;
import com.example.hcmiuweb.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, SubscriptionId> {
    List<Subscription> findBySubscriber(User subscriber);
    List<Subscription> findByChannelUser(User channelUser);
    long countByChannelUser(User channelUser);
    boolean existsBySubscriberAndChannelUser(User subscriber, User channelUser);
}