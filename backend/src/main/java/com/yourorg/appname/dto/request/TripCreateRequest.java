package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class TripCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Destination is required")
    private String destination;

    @Min(value = 1, message = "Duration days must be at least 1")
    private Integer durationDays = 1;

    private Integer durationNights = 0;

    private String category = "ALL";

    private String tag;

    private BigDecimal totalCost = BigDecimal.ZERO;

    private String currency = "USD";

    private String pace = "MODERATE";

    @Min(value = 1, message = "Travelers count must be at least 1")
    private Integer travelersCount = 1;

    private LocalDate startDate;

    private LocalDate endDate;

    private List<HighlightRequest> highlights;

    public static class HighlightRequest {
        private String dayRange;
        private String title;
        private String description;
        private Integer orderIndex;

        public HighlightRequest() {}

        public HighlightRequest(String dayRange, String title, String description, Integer orderIndex) {
            this.dayRange = dayRange;
            this.title = title;
            this.description = description;
            this.orderIndex = orderIndex;
        }

        public String getDayRange() { return dayRange; }
        public void setDayRange(String dayRange) { this.dayRange = dayRange; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Integer getOrderIndex() { return orderIndex; }
        public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
    }

    public TripCreateRequest() {}

    // Getters and Setters
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

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public List<HighlightRequest> getHighlights() { return highlights; }
    public void setHighlights(List<HighlightRequest> highlights) { this.highlights = highlights; }
}
