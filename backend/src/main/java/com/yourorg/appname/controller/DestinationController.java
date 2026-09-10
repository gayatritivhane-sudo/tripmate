package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.DestinationRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.DestinationResponse;
import com.yourorg.appname.service.DestinationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DestinationResponse>>> getAllDestinations(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        List<DestinationResponse> destinations = destinationService.getAllDestinations(category, search);
        return ResponseEntity.ok(ApiResponse.ok("Destinations retrieved", destinations));
    }

    @GetMapping("/trending")
    public ResponseEntity<ApiResponse<List<DestinationResponse>>> getTrendingDestinations() {
        List<DestinationResponse> trending = destinationService.getTrendingDestinations();
        return ResponseEntity.ok(ApiResponse.ok("Trending destinations retrieved", trending));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DestinationResponse>> getDestinationById(@PathVariable Long id) {
        DestinationResponse destination = destinationService.getDestinationById(id);
        return ResponseEntity.ok(ApiResponse.ok("Destination details retrieved", destination));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DestinationResponse>> createDestination(@Valid @RequestBody DestinationRequest request) {
        DestinationResponse created = destinationService.createDestination(request);
        return new ResponseEntity<>(ApiResponse.ok("Destination created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DestinationResponse>> updateDestination(
            @PathVariable Long id,
            @Valid @RequestBody DestinationRequest request) {
        DestinationResponse updated = destinationService.updateDestination(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Destination updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.ok(ApiResponse.ok("Destination deleted successfully", null));
    }
}
