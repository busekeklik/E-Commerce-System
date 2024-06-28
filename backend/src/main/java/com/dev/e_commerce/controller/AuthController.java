package com.dev.e_commerce.controller;

import com.dev.e_commerce.model.User;
import com.dev.e_commerce.repository.UserRepository;
import com.dev.e_commerce.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/1.0")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByUsername(request.getUsername()));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(new AuthResponse("success", "User authenticated successfully", user));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("error", "Invalid username or password", null));
    }

    @Setter
    @Getter
    public static class AuthRequest {
        private String username;
        private String password;
    }

    @Setter
    @Getter
    public static class AuthResponse {
        private String status;
        private String message;
        private User user;

        public AuthResponse(String status, String message, User user) {
            this.status = status;
            this.message = message;
            this.user = user;
        }
    }
}
