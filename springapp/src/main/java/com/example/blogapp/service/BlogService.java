package com.example.blogapp.service;

import com.example.blogapp.model.Blog;
import com.example.blogapp.repository.BlogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlogService {
    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public Blog create(Blog blog, String authorEmail) {
        blog.setAuthor(authorEmail);
        return blogRepository.save(blog);
    }

    public Optional<Blog> getById(Long id) {
        return blogRepository.findById(id);
    }

    public Page<Blog> list(int page, int size) {
        Pageable p = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("id").descending());
        return blogRepository.findAll(p);
    }

    public Page<Blog> listByAuthor(String author, int page, int size) {
        Pageable p = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("id").descending());
        return blogRepository.findByAuthor(author, p);
    }

    public java.util.List<Blog> listAll() {
        return blogRepository.findAll(org.springframework.data.domain.Sort.by("id").descending());
    }

    public Blog update(Long id, Blog updated) {
        return blogRepository.findById(id).map(b -> {
            b.setTitle(updated.getTitle());
            b.setContentMarkdown(updated.getContentMarkdown());
            b.setAuthor(updated.getAuthor());
            return blogRepository.save(b);
        }).orElseThrow(() -> new IllegalArgumentException("Blog not found"));
    }

    public void delete(Long id) {
        blogRepository.deleteById(id);
    }
}
