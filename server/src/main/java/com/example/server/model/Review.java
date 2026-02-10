package com.example.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @Size(min = 5, max = 1024)
    private String text;

    @Column(nullable = false, columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime publishDate;

    @Column(nullable = false)
    @Range(min = 1, max = 5)
    private int rating;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "offer_id", nullable = false)
    private Offer offer;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
