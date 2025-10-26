package com.example.blogapp.service;

import com.example.blogapp.model.Blog;
import com.example.blogapp.model.Report;
import com.example.blogapp.repository.BlogRepository;
import com.example.blogapp.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final BlogRepository blogRepository;

    public ReportService(ReportRepository reportRepository, BlogRepository blogRepository) {
        this.reportRepository = reportRepository;
        this.blogRepository = blogRepository;
    }

    public Report report(Long blogId, Report report) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalArgumentException("Blog not found"));
        report.setBlog(blog);
        return reportRepository.save(report);
    }

    public List<Report> listAll() {
        return reportRepository.findAll();
    }

    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }

    public void deleteBlog(Long blogId) {
        blogRepository.deleteById(blogId);
    }
}
