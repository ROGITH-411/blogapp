package com.example.blogapp.controller;

import com.example.blogapp.model.Comment;
import com.example.blogapp.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/blogs/{blogId}/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Comment> add(@PathVariable Long blogId, @RequestBody Comment comment) {
        Comment saved = commentService.addToBlog(blogId, comment);
        return ResponseEntity.created(URI.create("/api/blogs/" + blogId + "/comments/" + saved.getId())).body(saved);
    }

    @GetMapping
    public List<Comment> list(@PathVariable Long blogId) {
        return commentService.listForBlog(blogId);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> delete(@PathVariable Long blogId, @PathVariable Long commentId) {
        commentService.delete(commentId);
        return ResponseEntity.noContent().build();
    }
}
