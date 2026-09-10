package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class DestinationRequest {

    @NotBlank(message = "Destination name is required")
    private String name;

    @NotBlank(message = "Country is required")
    private String country;

    private String tagline;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private BigDecimal rating = new BigDecimal("5.00");
    private BigDecimal avgBudgetPerPerson = BigDecimal.ZERO;
    private String currency = "USD";
    private String category = "CULTURE";
    private Boolean isTrending = false;

    public DestinationRequest() {}

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
}
