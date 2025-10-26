package com.example.blogapp.controller;

import com.example.blogapp.model.AppUser;
import com.example.blogapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody java.util.Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String userType = request.get("userType");
            
            if (email == null || password == null) {
                return ResponseEntity.badRequest().body(java.util.Map.of("error", "Email and password are required"));
            }
            
            AppUser user = new AppUser();
            user.setEmail(email);
            user.setPassword(password);
            user.setRoles(java.util.Set.of("admin".equals(userType) ? "ROLE_ADMIN" : "ROLE_USER"));
            
            AppUser created = userService.register(user);
            return ResponseEntity.ok(java.util.Map.of("message", "Registration successful", "userType", userType));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public List<AppUser> list() {
        return userService.listAll();
    }
    
    @GetMapping("/debug")
    public ResponseEntity<?> debug() {
        List<AppUser> users = userService.listAll();
        return ResponseEntity.ok(java.util.Map.of(
            "totalUsers", users.size(),
            "users", users.stream().map(u -> java.util.Map.of(
                "id", u.getId(),
                "email", u.getEmail(),
                "roles", u.getRoles()
            )).collect(java.util.stream.Collectors.toList())
        ));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AppUser> get(@PathVariable Long id) {
        AppUser u = userService.findById(id);
        return u == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(u);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
