package com.example.blogapp.controller;

import com.example.blogapp.model.Blog;
import com.example.blogapp.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping
    public ResponseEntity<Blog> create(@RequestBody Blog blog, java.security.Principal principal) {
        String authorEmail = principal.getName();
        Blog saved = blogService.create(blog, authorEmail);
        return ResponseEntity.created(URI.create("/api/blogs/" + saved.getId())).body(saved);
    }

    @GetMapping
    public Page<Blog> list(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "100") int size, 
                          @RequestParam(required = false) String author) {
        if (author != null && !author.isEmpty()) {
            return blogService.listByAuthor(author, page, size);
        }
        return blogService.list(page, size);
    }

    @GetMapping("/all")
    public java.util.List<Blog> listAll() {
        return blogService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> get(@PathVariable Long id) {
        return blogService.getById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> update(@PathVariable Long id, @RequestBody Blog blog) {
        try {
            Blog updated = blogService.update(id, blog);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
