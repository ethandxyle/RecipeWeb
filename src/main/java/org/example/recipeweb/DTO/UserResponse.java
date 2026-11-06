package org.example.recipeweb.DTO;

import org.example.recipeweb.entity.User;

public record UserResponse(Long id, String username) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getUsername());
    }
}
