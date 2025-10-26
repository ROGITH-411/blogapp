package com.example.blogapp.controller;

import com.example.blogapp.model.Report;
import com.example.blogapp.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/blog/{blogId}")
    public ResponseEntity<Report> report(@PathVariable Long blogId, @RequestBody Report report) {
        Report saved = reportService.report(blogId, report);
        return ResponseEntity.created(URI.create("/api/reports/" + saved.getId())).body(saved);
    }

    @GetMapping
    public List<Report> list() {
        return reportService.listAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/blog/{blogId}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long blogId) {
        reportService.deleteBlog(blogId);
        return ResponseEntity.noContent().build();
    }
}
