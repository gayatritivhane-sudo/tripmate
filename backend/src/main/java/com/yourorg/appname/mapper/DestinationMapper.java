package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.request.DestinationRequest;
import com.yourorg.appname.dto.response.DestinationResponse;
import com.yourorg.appname.entity.Destination;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DestinationMapper {

    public DestinationResponse toResponse(Destination destination) {
        if (destination == null) return null;
        DestinationResponse response = new DestinationResponse();
        response.setId(destination.getId());
        response.setName(destination.getName());
        response.setCountry(destination.getCountry());
        response.setTagline(destination.getTagline());
        response.setDescription(destination.getDescription());
        response.setImageUrl(destination.getImageUrl());
        response.setRating(destination.getRating());
        response.setAvgBudgetPerPerson(destination.getAvgBudgetPerPerson());
        response.setCurrency(destination.getCurrency());
        response.setCategory(destination.getCategory());
        response.setIsTrending(destination.getIsTrending());
        response.setCreatedAt(destination.getCreatedAt());
        return response;
    }

    public Destination toEntity(DestinationRequest request) {
        if (request == null) return null;
        Destination destination = new Destination();
        destination.setName(request.getName());
        destination.setCountry(request.getCountry());
        destination.setTagline(request.getTagline());
        destination.setDescription(request.getDescription());
        destination.setImageUrl(request.getImageUrl());
        destination.setRating(request.getRating());
        destination.setAvgBudgetPerPerson(request.getAvgBudgetPerPerson());
        destination.setCurrency(request.getCurrency());
        destination.setCategory(request.getCategory());
        destination.setIsTrending(request.getIsTrending() != null ? request.getIsTrending() : false);
        destination.setCreatedAt(LocalDateTime.now());
        return destination;
    }

    public void updateEntity(Destination destination, DestinationRequest request) {
        if (destination == null || request == null) return;
        if (request.getName() != null) destination.setName(request.getName());
        if (request.getCountry() != null) destination.setCountry(request.getCountry());
        if (request.getTagline() != null) destination.setTagline(request.getTagline());
        if (request.getDescription() != null) destination.setDescription(request.getDescription());
        if (request.getImageUrl() != null) destination.setImageUrl(request.getImageUrl());
        if (request.getRating() != null) destination.setRating(request.getRating());
        if (request.getAvgBudgetPerPerson() != null) destination.setAvgBudgetPerPerson(request.getAvgBudgetPerPerson());
        if (request.getCurrency() != null) destination.setCurrency(request.getCurrency());
        if (request.getCategory() != null) destination.setCategory(request.getCategory());
        if (request.getIsTrending() != null) destination.setIsTrending(request.getIsTrending());
    }
}
