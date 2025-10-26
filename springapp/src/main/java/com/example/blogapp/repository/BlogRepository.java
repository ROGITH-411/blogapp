package com.example.blogapp.repository;

import com.example.blogapp.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    org.springframework.data.domain.Page<Blog> findByAuthor(String author, org.springframework.data.domain.Pageable pageable);
}
