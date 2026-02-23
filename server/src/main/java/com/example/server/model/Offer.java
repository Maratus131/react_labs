package com.example.server.model;

import com.example.server.converter.CityEnumConverter;
import com.example.server.converter.FeaturesEnumSetConverter;
import com.example.server.converter.TypeEnumConverter;
import com.example.server.enums.CityEnum;
import com.example.server.enums.FeaturesEnum;
import com.example.server.enums.TypeEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Range;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Size(min = 10, max = 100)
    @Column(nullable = false)
    private String title;

    @Size(min = 20, max = 1024)
    @Column(nullable = false)
    private String description;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime publishDate;

    @Convert(converter = CityEnumConverter.class)
    @Column(nullable = false)
    private CityEnum cityEnum;

    @Column(nullable = false)
    private String previewImage;

    @Column(nullable = false)
    private List<String> photos;

    @Column(nullable = false)
    private boolean isPremium;

    @Column(nullable = false)
    private boolean isFavorite;

    @Column(nullable = false)
    private double rating;

    @Convert(converter = TypeEnumConverter.class)
    @Column(nullable = false)
    private TypeEnum type;

    @Column(nullable = false)
    @Range(min = 1, max = 8)
    private int rooms;

    @Column(nullable = false)
    @Range(min = 0, max = 100)
    private int guests;

    @Column(nullable = false)
    @Range(min = 100, max = 100000)
    private double price;

    @Convert(converter = FeaturesEnumSetConverter.class)
    @Column(columnDefinition = "text[]", nullable = false)
    private Set<FeaturesEnum> features;

    @Column(nullable = false)
    private int commentsCount = 0;

    @Column(nullable = false)
    private float latitude;

    @Column(nullable = false)
    private float longitude;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id")
    private User author;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
