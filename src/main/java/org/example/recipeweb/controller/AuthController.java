package org.example.recipeweb.controller;

import org.example.recipeweb.DTO.UserDTO;
import org.example.recipeweb.entity.User;
import org.example.recipeweb.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // Update for your frontend domain in production
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            String username = body.get("username");
            String password = body.get("password");

            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(username);
            userDTO.setPassword(password);

            User user = userService.registerUser(userDTO);
            return ResponseEntity.ok(Map.of("id", user.getId(), "username", user.getUsername()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<User> userOpt = userService.authenticateUser(username, password);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return ResponseEntity.ok(Map.of("id", user.getId(), "username", user.getUsername()));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
    }
}
