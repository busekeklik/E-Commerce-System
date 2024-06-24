package com.dev.e_commerce.controller;

import com.dev.e_commerce.model.User;
import com.dev.e_commerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/1.0/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUser")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Username cannot be null or empty");
        }

        if (user.getAddress() == null || user.getAddress().isEmpty()) {
            return ResponseEntity.badRequest().body("Address cannot be null or empty");
        }

        userService.saveUser(user);
        return ResponseEntity.ok("User is created.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Username cannot be null or empty");
        }

        Optional<User> updatedUser = Optional.ofNullable(userService.updateUser(id, user));
        return updatedUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User is deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
