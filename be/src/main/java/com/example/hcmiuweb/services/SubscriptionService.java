package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.Subscription;
import com.example.hcmiuweb.entities.SubscriptionId;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.repositories.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public List<Subscription> findAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Optional<Subscription> findSubscriptionById(SubscriptionId id) {
        return subscriptionRepository.findById(id);
    }

    public List<Subscription> findSubscriptionsBySubscriber(User subscriber) {
        return subscriptionRepository.findBySubscriber(subscriber);
    }

    public List<Subscription> findSubscriptionsByCreator(User creator) {
        return subscriptionRepository.findByChannelUser(creator);
    }

    public boolean isSubscribed(User subscriber, User creator) {
        return subscriptionRepository.existsBySubscriberAndChannelUser(subscriber, creator);
    }

    public long countSubscribersByCreator(User creator) {
        return subscriptionRepository.countByChannelUser(creator);
    }

    public Subscription saveSubscription(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    public void deleteSubscription(SubscriptionId id) {
        subscriptionRepository.deleteById(id);
    }

    public void unsubscribe(User subscriber, User creator) {
        SubscriptionId id = new SubscriptionId(subscriber.getId(), creator.getId());
        subscriptionRepository.deleteById(id);
    }
}