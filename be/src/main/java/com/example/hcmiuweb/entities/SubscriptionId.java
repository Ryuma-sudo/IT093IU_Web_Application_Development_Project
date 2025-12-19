package com.example.hcmiuweb.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SubscriptionId implements Serializable {
    @Column(name = "subscriber_id")
    private Long subscriberId;

    @Column(name = "channel_user_id")
    private Long channelUserId;

    // Constructors
    public SubscriptionId() {}

    public SubscriptionId(Long subscriberId, Long channelUserId) {
        this.subscriberId = subscriberId;
        this.channelUserId = channelUserId;
    }

    // Getters & Setters
    public Long getSubscriberId() {
        return subscriberId;
    }
    public void setSubscriberId(Long subscriberId) {
        this.subscriberId = subscriberId;
    }

    public Long getChannelUserId() {
        return channelUserId;
    }
    public void setChannelUserId(Long channelUserId) {
        this.channelUserId = channelUserId;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SubscriptionId)) return false;
        SubscriptionId that = (SubscriptionId) o;
        return Objects.equals(subscriberId, that.subscriberId) &&
                Objects.equals(channelUserId, that.channelUserId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(subscriberId, channelUserId);
    }
}
