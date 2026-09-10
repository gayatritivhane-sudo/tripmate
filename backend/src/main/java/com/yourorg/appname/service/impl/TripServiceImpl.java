package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.TripCreateRequest;
import com.yourorg.appname.dto.request.TripUpdateRequest;
import com.yourorg.appname.dto.response.TripResponse;
import com.yourorg.appname.entity.Trip;
import com.yourorg.appname.entity.User;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.TripMapper;
import com.yourorg.appname.repository.TripRepository;
import com.yourorg.appname.repository.UserRepository;
import com.yourorg.appname.service.TripService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final TripMapper tripMapper;

    public TripServiceImpl(TripRepository tripRepository, UserRepository userRepository, TripMapper tripMapper) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.tripMapper = tripMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripResponse> getCuratedTrips(String category) {
        List<Trip> trips;
        if (category != null && !category.equalsIgnoreCase("ALL")) {
            trips = tripRepository.findByIsCuratedTrueAndCategoryIgnoreCase(category);
        } else {
            trips = tripRepository.findByIsCuratedTrue();
        }
        return trips.stream()
                .map(tripMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripResponse> getUserTrips(String usernameOrEmail) {
        User user = userRepository.findByUsername(usernameOrEmail)
                .or(() -> userRepository.findByEmail(usernameOrEmail))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return tripRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(tripMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TripResponse getTripById(Long id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));
        return tripMapper.toResponse(trip);
    }

    @Override
    @Transactional
    public TripResponse createTrip(TripCreateRequest request, String usernameOrEmail) {
        User user = null;
        if (usernameOrEmail != null && !usernameOrEmail.isBlank()) {
            user = userRepository.findByUsername(usernameOrEmail)
                    .or(() -> userRepository.findByEmail(usernameOrEmail))
                    .orElse(null);
        }

        Trip trip = tripMapper.toEntity(request, user);
        Trip saved = tripRepository.save(trip);
        return tripMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public TripResponse updateTrip(Long id, TripUpdateRequest request, String usernameOrEmail) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));

        if (usernameOrEmail != null) {
            User user = userRepository.findByUsername(usernameOrEmail)
                    .or(() -> userRepository.findByEmail(usernameOrEmail))
                    .orElse(null);

            if (user != null && trip.getUser() != null && !trip.getUser().getId().equals(user.getId()) && !"ROLE_ADMIN".equals(user.getRole())) {
                throw new BadRequestException("You do not have permission to update this trip");
            }
        }

        tripMapper.updateEntity(trip, request);
        Trip saved = tripRepository.save(trip);
        return tripMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteTrip(Long id, String usernameOrEmail) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));

        if (usernameOrEmail != null) {
            User user = userRepository.findByUsername(usernameOrEmail)
                    .or(() -> userRepository.findByEmail(usernameOrEmail))
                    .orElse(null);

            if (user != null && trip.getUser() != null && !trip.getUser().getId().equals(user.getId()) && !"ROLE_ADMIN".equals(user.getRole())) {
                throw new BadRequestException("You do not have permission to delete this trip");
            }
        }

        tripRepository.delete(trip);
    }
}
