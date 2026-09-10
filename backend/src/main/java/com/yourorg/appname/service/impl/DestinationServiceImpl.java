package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.DestinationRequest;
import com.yourorg.appname.dto.response.DestinationResponse;
import com.yourorg.appname.entity.Destination;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DestinationMapper;
import com.yourorg.appname.repository.DestinationRepository;
import com.yourorg.appname.service.DestinationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final DestinationMapper destinationMapper;

    public DestinationServiceImpl(DestinationRepository destinationRepository, DestinationMapper destinationMapper) {
        this.destinationRepository = destinationRepository;
        this.destinationMapper = destinationMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DestinationResponse> getAllDestinations(String category, String search) {
        List<Destination> destinations;
        if (search != null && !search.isBlank()) {
            destinations = destinationRepository.findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(search, search);
        } else if (category != null && !category.equalsIgnoreCase("ALL")) {
            destinations = destinationRepository.findByCategoryIgnoreCase(category);
        } else {
            destinations = destinationRepository.findAll();
        }

        return destinations.stream()
                .map(destinationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DestinationResponse> getTrendingDestinations() {
        return destinationRepository.findByIsTrendingTrue().stream()
                .map(destinationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DestinationResponse getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
        return destinationMapper.toResponse(destination);
    }

    @Override
    @Transactional
    public DestinationResponse createDestination(DestinationRequest request) {
        Destination destination = destinationMapper.toEntity(request);
        Destination saved = destinationRepository.save(destination);
        return destinationMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public DestinationResponse updateDestination(Long id, DestinationRequest request) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
        destinationMapper.updateEntity(destination, request);
        Destination saved = destinationRepository.save(destination);
        return destinationMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteDestination(Long id) {
        if (!destinationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Destination not found with id: " + id);
        }
        destinationRepository.deleteById(id);
    }
}
