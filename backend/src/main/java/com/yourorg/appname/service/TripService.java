package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.TripCreateRequest;
import com.yourorg.appname.dto.request.TripUpdateRequest;
import com.yourorg.appname.dto.response.TripResponse;

import java.util.List;

public interface TripService {
    List<TripResponse> getCuratedTrips(String category);
    List<TripResponse> getUserTrips(String usernameOrEmail);
    TripResponse getTripById(Long id);
    TripResponse createTrip(TripCreateRequest request, String usernameOrEmail);
    TripResponse updateTrip(Long id, TripUpdateRequest request, String usernameOrEmail);
    void deleteTrip(Long id, String usernameOrEmail);
}
