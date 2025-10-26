package com.example.blogapp.service;

import com.example.blogapp.model.Blog;
import com.example.blogapp.model.Comment;
import com.example.blogapp.repository.BlogRepository;
import com.example.blogapp.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;

    public CommentService(CommentRepository commentRepository, BlogRepository blogRepository) {
        this.commentRepository = commentRepository;
        this.blogRepository = blogRepository;
    }

    public Comment addToBlog(Long blogId, Comment comment) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalArgumentException("Blog not found"));
        comment.setBlog(blog);
        return commentRepository.save(comment);
    }

    public List<Comment> listForBlog(Long blogId) {
        return commentRepository.findByBlogId(blogId);
    }

    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
