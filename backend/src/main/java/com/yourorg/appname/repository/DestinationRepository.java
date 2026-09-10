package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findByIsTrendingTrue();
    List<Destination> findByCategoryIgnoreCase(String category);
    List<Destination> findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(String name, String country);
}
