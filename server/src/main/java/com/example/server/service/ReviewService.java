package com.example.server.service;

import com.example.server.dto.AddReviewDtoRequest;
import com.example.server.dto.FullReviewDto;
import com.example.server.dto.ReviewDto;
import com.example.server.exceptions.OfferNotFoundException;
import com.example.server.exceptions.UserNotFoundException;
import com.example.server.model.Offer;
import com.example.server.model.Review;
import com.example.server.model.User;
import com.example.server.repository.OfferRepository;
import com.example.server.repository.ReviewRepository;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    @Value("${app.base-url}")
    private String baseUrl;

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final OfferRepository offerRepository;
    private final FileStorageService fileStorageService;

    public ReviewDto addReview(AddReviewDtoRequest request) {
        Review review = new Review();
        review.setText(request.getComment());
        review.setRating(request.getRating());
        User author = userRepository.findById(request.getUserId()).orElseThrow(() -> new UserNotFoundException(request.getUserId()));
        review.setAuthor(author);
        Offer offer = offerRepository.findById(request.getOfferId()).orElseThrow(() -> new OfferNotFoundException(request.getOfferId()));
        review.setOffer(offer);

        reviewRepository.save(review);

        return mapToDto(review);
    }

    public List<FullReviewDto> getReviewsByOfferId(int offerId) {
        List<Review> reviews = reviewRepository.findAllByOfferId(offerId);

        return reviews.stream()
                .map(this::mapToFullReviewDto)
                .toList();
    }

    public FullReviewDto mapToFullReviewDto(Review review) {
        FullReviewDto dto = new FullReviewDto();
        dto.setReviewId(review.getId());
        dto.setComment(review.getText());
        dto.setRating(review.getRating());
        FullReviewDto.ReviewAuthor author = new FullReviewDto.ReviewAuthor();
        if (review.getAuthor() != null) {
            author.setUsername(review.getAuthor().getUsername());
            author.setPro(review.getAuthor().getUserType().name().equals("PRO"));
            author.setAvatarUrl(fileStorageService.prepareUrl(baseUrl, review.getAuthor().getAvatar()));
        }
        dto.setUser(author);
        dto.setDate(review.getPublishDate());
        return dto;
    }

    private ReviewDto mapToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setReviewId(review.getId());
        dto.setComment(review.getText());
        dto.setRating(review.getRating());
        dto.setOfferId(review.getOffer().getId());
        dto.setUserId(review.getAuthor().getId());

        return dto;
    }
}
