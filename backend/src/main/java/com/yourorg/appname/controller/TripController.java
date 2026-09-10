package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.TripCreateRequest;
import com.yourorg.appname.dto.request.TripUpdateRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.TripResponse;
import com.yourorg.appname.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/curated")
    public ResponseEntity<ApiResponse<List<TripResponse>>> getCuratedTrips(
            @RequestParam(required = false) String category) {
        List<TripResponse> trips = tripService.getCuratedTrips(category);
        return ResponseEntity.ok(ApiResponse.ok("Curated trips retrieved", trips));
    }

    @GetMapping("/my-trips")
    public ResponseEntity<ApiResponse<List<TripResponse>>> getUserTrips(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Authentication required to view trips"));
        }
        List<TripResponse> trips = tripService.getUserTrips(authentication.getName());
        return ResponseEntity.ok(ApiResponse.ok("User trips retrieved", trips));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TripResponse>> getTripById(@PathVariable Long id) {
        TripResponse trip = tripService.getTripById(id);
        return ResponseEntity.ok(ApiResponse.ok("Trip details retrieved", trip));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TripResponse>> createTrip(
            @Valid @RequestBody TripCreateRequest request,
            Authentication authentication) {
        String usernameOrEmail = (authentication != null) ? authentication.getName() : null;
        TripResponse created = tripService.createTrip(request, usernameOrEmail);
        return new ResponseEntity<>(ApiResponse.ok("Trip planned successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TripResponse>> updateTrip(
            @PathVariable Long id,
            @Valid @RequestBody TripUpdateRequest request,
            Authentication authentication) {
        String usernameOrEmail = (authentication != null) ? authentication.getName() : null;
        TripResponse updated = tripService.updateTrip(id, request, usernameOrEmail);
        return ResponseEntity.ok(ApiResponse.ok("Trip updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTrip(
            @PathVariable Long id,
            Authentication authentication) {
        String usernameOrEmail = (authentication != null) ? authentication.getName() : null;
        tripService.deleteTrip(id, usernameOrEmail);
        return ResponseEntity.ok(ApiResponse.ok("Trip deleted successfully", null));
    }
}
