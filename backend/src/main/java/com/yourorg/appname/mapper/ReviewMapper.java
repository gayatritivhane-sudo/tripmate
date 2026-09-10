package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.ReviewResponse;
import com.yourorg.appname.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public ReviewResponse toResponse(Review review) {
        if (review == null) return null;
        return new ReviewResponse(
                review.getId(),
                review.getAuthorName(),
                review.getAuthorRole(),
                review.getAuthorAvatarUrl(),
                review.getRating(),
                review.getComment(),
                review.getIsVerified(),
                review.getCreatedAt()
        );
    }
}
