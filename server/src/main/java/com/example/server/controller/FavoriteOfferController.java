package com.example.server.controller;

import com.example.server.dto.OfferDtoResponse;
import com.example.server.dto.ToogleFavoriteDtoRequest;
import com.example.server.service.FavoriteOfferService;
import com.example.server.service.OfferService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
@Tag(name="Favorite offers", description = "Work with favorite offers")
public class FavoriteOfferController {
    private final FavoriteOfferService favoriteOfferService;

    @GetMapping
    @Operation(summary = "Получение избранных предложений")
    @ApiResponse(responseCode = "200", description = "Избранные предложения успешно получены")
    public ResponseEntity<List<OfferDtoResponse>> getFavoriteOffers() {
        List<OfferDtoResponse> favoritesOffers = favoriteOfferService.getFavoritesOffers();
        return ResponseEntity.ok(favoritesOffers);
    }

    @PostMapping("/{id}/{status}")
    @Operation(summary = "Переключение статуса", description = "Переключает статус на избранный и наоборот")
    @ApiResponse(responseCode = "200", description = "Статус предложения успешно изменен")
    @ApiResponse(responseCode = "404", description = "Предложения с данным id не существует")
    public ResponseEntity<OfferDtoResponse> toogleFavoriteOffer(@PathVariable int id, @PathVariable int status) {
        ToogleFavoriteDtoRequest request = new ToogleFavoriteDtoRequest();
        request.setOfferId(id);
        request.setStatus(status);
        OfferDtoResponse response = favoriteOfferService.toogleFavorite(request);
        return ResponseEntity.ok(response);
    }

}
