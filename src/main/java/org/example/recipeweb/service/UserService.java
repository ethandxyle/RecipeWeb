package org.example.recipeweb.service;

import org.example.recipeweb.DTO.UserDTO;
import org.example.recipeweb.entity.User;
import org.example.recipeweb.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new user with hashed password
    public User registerUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        return userRepository.save(user);
    }

    // Authenticate a user by username and password
    public Optional<User> authenticateUser(String username, String rawPassword) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}

