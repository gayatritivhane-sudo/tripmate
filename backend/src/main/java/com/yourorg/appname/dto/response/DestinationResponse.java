package com.yourorg.appname.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DestinationResponse {

    private Long id;
    private String name;
    private String country;
    private String tagline;
    private String description;
    private String imageUrl;
    private BigDecimal rating;
    private BigDecimal avgBudgetPerPerson;
    private String currency;
    private String category;
    private Boolean isTrending;
    private LocalDateTime createdAt;

    public DestinationResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public BigDecimal getAvgBudgetPerPerson() { return avgBudgetPerPerson; }
    public void setAvgBudgetPerPerson(BigDecimal avgBudgetPerPerson) { this.avgBudgetPerPerson = avgBudgetPerPerson; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Boolean getIsTrending() { return isTrending; }
    public void setIsTrending(Boolean isTrending) { this.isTrending = isTrending; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
