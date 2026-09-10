package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByIsCuratedTrue();
    List<Trip> findByIsCuratedTrueAndCategoryIgnoreCase(String category);
    List<Trip> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Trip> findByUserIdAndStatusIgnoreCase(Long userId, String status);
}
