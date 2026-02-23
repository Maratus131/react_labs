package com.example.server.repository;

import com.example.server.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    @Query(value = """
        SELECT * FROM offers WHERE is_favorite = true
        """, nativeQuery = true)
    List<Offer> findAllByIsFavorite();
}
