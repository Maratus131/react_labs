package com.example.server.controller;

import com.example.server.dto.OfferDtoResponse;
import com.example.server.dto.ToogleFavoriteDtoRequest;
import com.example.server.service.FavoriteOfferService;
import com.example.server.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
public class FavoriteOfferController {
    private final FavoriteOfferService favoriteOfferService;

    @GetMapping
    public ResponseEntity<List<OfferDtoResponse>> getFavoriteOffers() {
        List<OfferDtoResponse> favoritesOffers = favoriteOfferService.getFavoritesOffers();
        return ResponseEntity.ok(favoritesOffers);
    }

    @PostMapping("/{id}/{status}")
    public ResponseEntity<OfferDtoResponse> toogleFavoriteOffer(@PathVariable int id, @PathVariable int status) {
        ToogleFavoriteDtoRequest request = new ToogleFavoriteDtoRequest();
        request.setOfferId(id);
        request.setStatus(status);
        OfferDtoResponse response = favoriteOfferService.toogleFavorite(request);
        return ResponseEntity.ok(response);
    }

}
