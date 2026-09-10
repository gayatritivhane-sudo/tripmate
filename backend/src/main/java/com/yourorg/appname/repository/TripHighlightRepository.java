package com.yourorg.appname.repository;

import com.yourorg.appname.entity.TripHighlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripHighlightRepository extends JpaRepository<TripHighlight, Long> {
    List<TripHighlight> findByTripIdOrderByOrderIndexAsc(Long tripId);
}
