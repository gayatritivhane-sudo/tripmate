package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.request.TripCreateRequest;
import com.yourorg.appname.dto.request.TripUpdateRequest;
import com.yourorg.appname.dto.response.TripHighlightResponse;
import com.yourorg.appname.dto.response.TripResponse;
import com.yourorg.appname.entity.Trip;
import com.yourorg.appname.entity.TripHighlight;
import com.yourorg.appname.entity.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TripMapper {

    public TripResponse toResponse(Trip trip) {
        if (trip == null) return null;
        TripResponse response = new TripResponse();
        response.setId(trip.getId());
        response.setUserId(trip.getUser() != null ? trip.getUser().getId() : null);
        response.setTitle(trip.getTitle());
        response.setDestination(trip.getDestination());
        response.setDurationDays(trip.getDurationDays());
        response.setDurationNights(trip.getDurationNights());
        response.setCategory(trip.getCategory());
        response.setTag(trip.getTag());
        response.setTotalCost(trip.getTotalCost());
        response.setCurrency(trip.getCurrency());
        response.setPace(trip.getPace());
        response.setTravelersCount(trip.getTravelersCount());
        response.setStatus(trip.getStatus());
        response.setStartDate(trip.getStartDate());
        response.setEndDate(trip.getEndDate());
        response.setIsCurated(trip.getIsCurated());
        response.setCollaboratorsMeta(trip.getCollaboratorsMeta());
        response.setCreatedAt(trip.getCreatedAt());
        response.setUpdatedAt(trip.getUpdatedAt());

        if (trip.getHighlights() != null) {
            List<TripHighlightResponse> highlightResponses = trip.getHighlights().stream()
                    .map(h -> new TripHighlightResponse(h.getId(), h.getDayRange(), h.getTitle(), h.getDescription(), h.getOrderIndex()))
                    .collect(Collectors.toList());
            response.setHighlights(highlightResponses);
        } else {
            response.setHighlights(new ArrayList<>());
        }

        return response;
    }

    public Trip toEntity(TripCreateRequest request, User user) {
        if (request == null) return null;
        Trip trip = new Trip();
        trip.setUser(user);
        trip.setTitle(request.getTitle());
        trip.setDestination(request.getDestination());
        trip.setDurationDays(request.getDurationDays() != null ? request.getDurationDays() : 1);
        trip.setDurationNights(request.getDurationNights() != null ? request.getDurationNights() : 0);
        trip.setCategory(request.getCategory() != null ? request.getCategory() : "ALL");
        trip.setTag(request.getTag());
        trip.setTotalCost(request.getTotalCost() != null ? request.getTotalCost() : java.math.BigDecimal.ZERO);
        trip.setCurrency(request.getCurrency() != null ? request.getCurrency() : "USD");
        trip.setPace(request.getPace() != null ? request.getPace() : "MODERATE");
        trip.setTravelersCount(request.getTravelersCount() != null ? request.getTravelersCount() : 1);
        trip.setStatus("CONFIRMED");
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setIsCurated(false);
        trip.setCreatedAt(LocalDateTime.now());
        trip.setUpdatedAt(LocalDateTime.now());

        if (request.getHighlights() != null) {
            for (TripCreateRequest.HighlightRequest hr : request.getHighlights()) {
                TripHighlight highlight = new TripHighlight(
                        trip,
                        hr.getDayRange(),
                        hr.getTitle(),
                        hr.getDescription(),
                        hr.getOrderIndex() != null ? hr.getOrderIndex() : 0
                );
                trip.addHighlight(highlight);
            }
        }

        return trip;
    }

    public void updateEntity(Trip trip, TripUpdateRequest request) {
        if (trip == null || request == null) return;
        if (request.getTitle() != null) trip.setTitle(request.getTitle());
        if (request.getDestination() != null) trip.setDestination(request.getDestination());
        if (request.getDurationDays() != null) trip.setDurationDays(request.getDurationDays());
        if (request.getDurationNights() != null) trip.setDurationNights(request.getDurationNights());
        if (request.getCategory() != null) trip.setCategory(request.getCategory());
        if (request.getTag() != null) trip.setTag(request.getTag());
        if (request.getTotalCost() != null) trip.setTotalCost(request.getTotalCost());
        if (request.getCurrency() != null) trip.setCurrency(request.getCurrency());
        if (request.getPace() != null) trip.setPace(request.getPace());
        if (request.getTravelersCount() != null) trip.setTravelersCount(request.getTravelersCount());
        if (request.getStatus() != null) trip.setStatus(request.getStatus());
        if (request.getStartDate() != null) trip.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) trip.setEndDate(request.getEndDate());

        if (request.getHighlights() != null) {
            trip.getHighlights().clear();
            for (TripCreateRequest.HighlightRequest hr : request.getHighlights()) {
                TripHighlight highlight = new TripHighlight(
                        trip,
                        hr.getDayRange(),
                        hr.getTitle(),
                        hr.getDescription(),
                        hr.getOrderIndex() != null ? hr.getOrderIndex() : 0
                );
                trip.addHighlight(highlight);
            }
        }
    }
}
