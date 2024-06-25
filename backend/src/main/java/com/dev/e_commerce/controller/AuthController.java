package com.dev.e_commerce.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        if ("user".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            return ResponseEntity.ok(new AuthResponse("success", "User authenticated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("error", "Invalid username or password"));
        }
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

        public AuthResponse(String status, String message) {
            this.status = status;
            this.message = message;
        }

    }
}
