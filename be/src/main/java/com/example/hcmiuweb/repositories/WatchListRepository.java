package com.example.hcmiuweb.repositories;

import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.entities.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WatchListRepository extends JpaRepository<WatchList, Long> {
    Optional<WatchList> findByUser(User user);
    boolean existsByUser(User user);
}
