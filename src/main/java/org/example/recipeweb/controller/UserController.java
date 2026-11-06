package org.example.recipeweb.controller;

import jakarta.validation.Valid;
import org.example.recipeweb.DTO.UserDTO;
import org.example.recipeweb.DTO.UserResponse;
import org.example.recipeweb.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Retain the original registration URL for existing clients.
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.from(userService.registerUser(userDTO)));
    }
}
