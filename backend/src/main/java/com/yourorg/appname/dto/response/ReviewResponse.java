package com.yourorg.appname.dto.response;

import java.time.LocalDateTime;

public class ReviewResponse {

    private Long id;
    private String authorName;
    private String authorRole;
    private String authorAvatarUrl;
    private Integer rating;
    private String comment;
    private Boolean isVerified;
    private LocalDateTime createdAt;

    public ReviewResponse() {}

    public ReviewResponse(Long id, String authorName, String authorRole, String authorAvatarUrl, Integer rating, String comment, Boolean isVerified, LocalDateTime createdAt) {
        this.id = id;
        this.authorName = authorName;
        this.authorRole = authorRole;
        this.authorAvatarUrl = authorAvatarUrl;
        this.rating = rating;
        this.comment = comment;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }

    public String getAuthorAvatarUrl() { return authorAvatarUrl; }
    public void setAuthorAvatarUrl(String authorAvatarUrl) { this.authorAvatarUrl = authorAvatarUrl; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
