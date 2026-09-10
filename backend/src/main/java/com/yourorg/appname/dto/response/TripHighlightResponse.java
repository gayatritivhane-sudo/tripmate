package com.yourorg.appname.dto.response;

public class TripHighlightResponse {

    private Long id;
    private String dayRange;
    private String title;
    private String description;
    private Integer orderIndex;

    public TripHighlightResponse() {}

    public TripHighlightResponse(Long id, String dayRange, String title, String description, Integer orderIndex) {
        this.id = id;
        this.dayRange = dayRange;
        this.title = title;
        this.description = description;
        this.orderIndex = orderIndex;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDayRange() { return dayRange; }
    public void setDayRange(String dayRange) { this.dayRange = dayRange; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
}
