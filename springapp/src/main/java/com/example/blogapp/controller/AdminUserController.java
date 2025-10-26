package com.example.blogapp.controller;

import com.example.blogapp.model.AppUser;
import com.example.blogapp.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashSet;

@RestController
@RequestMapping("/api/users")
public class AdminUserController {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.secret}")
    private String adminSecret;

    public AdminUserController(AppUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/admin-register")
    public ResponseEntity<?> adminRegister(@RequestBody AppUser user, @RequestHeader("X-Admin-Secret") String secret) {
        if (secret == null || !secret.equals(adminSecret)) return ResponseEntity.status(403).build();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRoles() == null) user.setRoles(new HashSet<>());
        user.getRoles().add("ADMIN");
        user.getRoles().add("USER");
        AppUser saved = userRepository.save(user);
        return ResponseEntity.created(URI.create("/api/users/" + saved.getId())).body(saved);
    }
}
