package com.example.server.controller;

import com.example.server.dto.AddReviewDtoRequest;
import com.example.server.dto.FullReviewDto;
import com.example.server.dto.ReviewDto;
import com.example.server.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
@Tag(name = "Reviews",description = "Work with reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    @Operation(summary = "Добавление комментария", description = "Добавляет комментарий с данными, включая offerId, user")
    @ApiResponse(responseCode = "204", description = "Комментарий успешно добавлен")
    @ApiResponse(responseCode = "404", description = "User или offer не найдены")
    public ResponseEntity<ReviewDto> addReview(@RequestBody AddReviewDtoRequest reviewDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.addReview(reviewDto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получение комментариев", description = "Получает комментарии для указанного offer")
    @ApiResponse(responseCode = "200", description = "Комментарии успешно получены")
    @ApiResponse(responseCode = "404", description = "Offer с отправленным id не существует")
    public ResponseEntity<List<FullReviewDto>> getReviewByOfferId(@PathVariable int id) {
        List<FullReviewDto> reviewDto = reviewService.getReviewsByOfferId(id);
        return ResponseEntity.ok(reviewDto);
    }}
