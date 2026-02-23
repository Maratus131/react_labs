package com.example.server.service;

import com.example.server.dto.OfferDtoResponse;
import com.example.server.dto.ToogleFavoriteDtoRequest;
import com.example.server.exceptions.OfferNotFoundException;
import com.example.server.model.Offer;
import com.example.server.repository.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteOfferService {
    private final OfferService offerService;
    private final OfferRepository offerRepository;

    public List<OfferDtoResponse> getFavoritesOffers() {
        List<Offer> favorites = offerRepository.findAllByIsFavorite();
        return favorites.stream()
                .map(offerService::mapToOfferDtoResponse)
                .toList();
    }

    public OfferDtoResponse toogleFavorite(ToogleFavoriteDtoRequest request) {
        Offer offer = offerRepository.findById(request.getOfferId()).orElseThrow(() -> new OfferNotFoundException(request.getOfferId()));
        offer.setFavorite(request.getStatus() == 1);

        offerRepository.save(offer);
        return offerService.mapToOfferDtoResponse(offer);
    }
}
