package com.yourorg.appname.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class TripResponse {

    private Long id;
    private Long userId;
    private String title;
    private String destination;
    private Integer durationDays;
    private Integer durationNights;
    private String category;
    private String tag;
    private BigDecimal totalCost;
    private String currency;
    private String pace;
    private Integer travelersCount;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isCurated;
    private String collaboratorsMeta;
    private List<TripHighlightResponse> highlights;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TripResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

    public Integer getDurationNights() { return durationNights; }
    public void setDurationNights(Integer durationNights) { this.durationNights = durationNights; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public BigDecimal getTotalCost() { return totalCost; }
    public void setTotalCost(BigDecimal totalCost) { this.totalCost = totalCost; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getPace() { return pace; }
    public void setPace(String pace) { this.pace = pace; }

    public Integer getTravelersCount() { return travelersCount; }
    public void setTravelersCount(Integer travelersCount) { this.travelersCount = travelersCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Boolean getIsCurated() { return isCurated; }
    public void setIsCurated(Boolean isCurated) { this.isCurated = isCurated; }

    public String getCollaboratorsMeta() { return collaboratorsMeta; }
    public void setCollaboratorsMeta(String collaboratorsMeta) { this.collaboratorsMeta = collaboratorsMeta; }

    public List<TripHighlightResponse> getHighlights() { return highlights; }
    public void setHighlights(List<TripHighlightResponse> highlights) { this.highlights = highlights; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
