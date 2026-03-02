package com.example.server.controller;

import com.example.server.dto.CreateOfferDtoRequest;
import com.example.server.dto.FullOfferDto;
import com.example.server.dto.OfferDtoResponse;
import com.example.server.model.Offer;
import com.example.server.service.OfferService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/offers")
@RequiredArgsConstructor
@Tag(name="Offers", description = "Work with offers")
public class OfferController {
    private final OfferService offerService;

    @GetMapping
    @Operation(summary = "Получение предложений по аренде", description = "Получает все предложения по аренде")
    @ApiResponse(responseCode = "200", description = "Предложения успешно получены")
    public List<OfferDtoResponse> getOffers() {
        return offerService.getAllOffers();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Создание предложения")
    @ApiResponse(responseCode = "204", description = "Предложение успешно создано")
    @ApiResponse(responseCode = "404", description = "User с отправленным id не существует")
    public ResponseEntity<OfferDtoResponse> createOffer(
            @ModelAttribute CreateOfferDtoRequest request,
            @RequestParam("previewImage") MultipartFile previewImage,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos
    ) throws IOException {
        OfferDtoResponse response =
                offerService.createOffer(request, previewImage, photos);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получение полной информации для конкретного предложения")
    @ApiResponse(responseCode = "200", description = "Предложение успешно получено")
    @ApiResponse(responseCode = "404", description = "Предложение с отправленным id не существует")
    public ResponseEntity<FullOfferDto> getOfferById(@PathVariable int id) {
        FullOfferDto offer = offerService.getFullOffer(id);
        return ResponseEntity.ok(offer);
    }
}
