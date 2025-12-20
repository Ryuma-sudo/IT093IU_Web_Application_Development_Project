package com.example.hcmiuweb.services;

import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        // Don't re-encode password if it's the same as before
        if (user.getId() != null) {
            Optional<User> existingUser = userRepository.findById(user.getId());
            if (existingUser.isPresent() && !existingUser.get().getPassword().equals(user.getPassword())) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Update only the user's role without modifying other fields
     */
    public User updateUserRole(Long userId, com.example.hcmiuweb.entities.Role newRole) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setRole(newRole);
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Change user password
     */
    public boolean changePassword(Long userId, String currentPassword, String newPassword) {
        return userRepository.findById(userId)
                .map(user -> {
                    // Verify current password
                    if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                        return false;
                    }
                    // Set new password (encoded)
                    user.setPassword(passwordEncoder.encode(newPassword));
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);
    }
}