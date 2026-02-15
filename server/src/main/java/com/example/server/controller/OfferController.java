package com.example.server.controller;

import com.example.server.dto.CreateOfferDtoRequest;
import com.example.server.dto.CreateOfferDtoResponse;
import com.example.server.model.Offer;
import com.example.server.service.OfferService;
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
public class OfferController {
    private final OfferService offerService;

    @GetMapping
    public List<Offer> getOffers() {
        return offerService.getAllOffers();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreateOfferDtoResponse> createOffer(
            @ModelAttribute CreateOfferDtoRequest request,
            @RequestParam("previewImage") MultipartFile previewImage,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos
    ) throws IOException {
        CreateOfferDtoResponse response =
                offerService.createOffer(request, previewImage, photos);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
