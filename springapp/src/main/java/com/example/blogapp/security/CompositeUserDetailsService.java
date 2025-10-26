package com.example.blogapp.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CompositeUserDetailsService implements UserDetailsService {
    
    private final UserDetailsService inMemoryUserDetailsService;
    private final UserDetailsService jpaUserDetailsService;
    
    public CompositeUserDetailsService(UserDetailsService inMemoryUserDetailsService, 
                                     UserDetailsService jpaUserDetailsService) {
        this.inMemoryUserDetailsService = inMemoryUserDetailsService;
        this.jpaUserDetailsService = jpaUserDetailsService;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            // First try in-memory users (admin/adminpass, user/password)
            return inMemoryUserDetailsService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            // If not found, try database users (registered users)
            return jpaUserDetailsService.loadUserByUsername(username);
        }
    }
}