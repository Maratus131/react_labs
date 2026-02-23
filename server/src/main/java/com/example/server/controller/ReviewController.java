package com.example.server.controller;

import com.example.server.dto.AddReviewDtoRequest;
import com.example.server.dto.FullReviewDto;
import com.example.server.dto.ReviewDto;
import com.example.server.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDto> addReview(@RequestBody AddReviewDtoRequest reviewDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.addReview(reviewDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<FullReviewDto>> getReviewByOfferId(@PathVariable int id) {
        List<FullReviewDto> reviewDto = reviewService.getReviewsByOfferId(id);
        return ResponseEntity.ok(reviewDto);
    }}
