package com.example.blogapp.model;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id")
    private Blog blog;

    private String reporter;

    @Column(columnDefinition = "TEXT")
    private String reason;

    private OffsetDateTime reportedAt = OffsetDateTime.now();

    public Report() {
    }

    public Report(Long id, Blog blog, String reporter, String reason, OffsetDateTime reportedAt) {
        this.id = id;
        this.blog = blog;
        this.reporter = reporter;
        this.reason = reason;
        this.reportedAt = reportedAt == null ? OffsetDateTime.now() : reportedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public OffsetDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(OffsetDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }
}
