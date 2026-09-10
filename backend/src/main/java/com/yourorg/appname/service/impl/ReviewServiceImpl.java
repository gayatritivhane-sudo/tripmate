package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.ReviewResponse;
import com.yourorg.appname.mapper.ReviewMapper;
import com.yourorg.appname.repository.ReviewRepository;
import com.yourorg.appname.service.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ReviewMapper reviewMapper) {
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findByOrderByCreatedAtDesc().stream()
                .map(reviewMapper::toResponse)
                .collect(Collectors.toList());
    }
}
