package com.example.server.service;

import com.example.server.dto.CreateOfferDtoRequest;
import com.example.server.dto.FullOfferDto;
import com.example.server.dto.OfferDtoResponse;
import com.example.server.enums.CityEnum;
import com.example.server.enums.FeaturesEnum;
import com.example.server.exceptions.OfferNotFoundException;
import com.example.server.exceptions.UserNotFoundException;
import com.example.server.model.Offer;
import com.example.server.repository.OfferRepository;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;
    private final UserService userService;

    @Value("${app.base-url}")
    private String baseUrl;

    public List<OfferDtoResponse> getAllOffers() {
        List<Offer> offers = offerRepository.findAll();
        return offers
                .stream()
                .map(this::mapToOfferDtoResponse)
                .toList();
    }

    public FullOfferDto getFullOffer(int id) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new OfferNotFoundException(id));

        return mapToFullOfferDto(offer);
    }

    public OfferDtoResponse createOffer(
            CreateOfferDtoRequest request,
            MultipartFile previewImage,
            List<MultipartFile> photos)
            throws IOException {
        if (previewImage == null || previewImage.isEmpty()) {
            throw new RuntimeException("Preview image is required");
        }

        if (photos != null && photos.size() > 6) {
            throw new RuntimeException("Photos size must be 6");
        }

        String previewFilename = fileStorageService.saveImage(previewImage, "offers");

        List<String> photoPaths = new ArrayList<>();

        if (photos != null) {
            for (MultipartFile photo : photos) {
                if (!photo.isEmpty()) {
                    photoPaths.add(fileStorageService.saveImage(photo, "offers"));
                }
            }
        }

        Offer offer = new Offer();

        offer.setTitle(request.getTitle());
        offer.setDescription(request.getDescription());
        offer.setCityEnum(request.getCity());
        offer.setPreviewImage(previewFilename);
        offer.setPhotos(photoPaths);
        offer.setPrice(request.getPrice());
        offer.setPremium(request.isPremium());
        offer.setRooms(request.getRooms());
        offer.setGuests(request.getGuests());
        offer.setRating(request.getRating());
        offer.setType(request.getType());
        offer.setPublishDate(request.getPublishDate());
        offer.setFeatures(request.getFeatures());
        offer.setCommentsCount(request.getCommentsCount());
        offer.setLatitude(request.getLatitude());
        offer.setLongitude(request.getLongitude());
        offer.setFavorite(request.isFavorite());
        offer.setAuthor(userRepository.findById(request.getUserId()).orElseThrow(() -> new UserNotFoundException(request.getUserId())));

        offerRepository.save(offer);

        return mapToOfferDtoResponse(offer);
    }

    public OfferDtoResponse mapToOfferDtoResponse(Offer offer) {
        OfferDtoResponse response = new OfferDtoResponse();
        response.setId(offer.getId());
        response.setTitle(offer.getTitle());
        response.setDescription(offer.getDescription());
        response.setPublishDate(offer.getPublishDate());
        response.setPrice(offer.getPrice());
        response.setRooms(offer.getRooms());
        response.setGuests(offer.getGuests());
        response.setPreviewImage(fileStorageService.prepareUrl(baseUrl, offer.getPreviewImage()));
        response.setFeatures(offer.getFeatures()
                .stream().map(FeaturesEnum::getValue).collect(Collectors.toSet()));
        response.setCommentsCount(offer.getCommentsCount());

        response.setPremium(offer.isPremium());
        response.setFavorite(offer.isFavorite());
        response.setUserId(offer.getAuthor().getId());
        response.setType(offer.getType().getValue());
        response.setRating(offer.getRating());
        if (offer.getPhotos() != null) {
            response.setImages(offer.getPhotos().stream()
                    .map(photo -> fileStorageService.prepareUrl(baseUrl, photo))
                    .toList());
        }

        CityEnum cityEnum = offer.getCityEnum();
        if (cityEnum != null) {
            OfferDtoResponse.CityDto cityDto = new OfferDtoResponse.CityDto();
            cityDto.setName(cityEnum.getValue());
            cityDto.setLocation(new OfferDtoResponse.LocationDto(
                    cityEnum.getLatitude(),
                    cityEnum.getLongitude(),
                    cityEnum.getZoom()
            ));
            response.setCity(cityDto);
        }

        response.setLocation(new OfferDtoResponse.LocationDto(
                offer.getLatitude(),
                offer.getLongitude(),
                13
        ));

        return response;
    }


    public FullOfferDto mapToFullOfferDto(Offer offer) {
        FullOfferDto fullOffer = new FullOfferDto();
        fullOffer.setId(offer.getId());
        fullOffer.setTitle(offer.getTitle());
        fullOffer.setDescription(offer.getDescription());
        fullOffer.setPublishDate(offer.getPublishDate());
        fullOffer.setPrice(offer.getPrice());
        fullOffer.setRooms(offer.getRooms());
        fullOffer.setGuests(offer.getGuests());
        fullOffer.setPreviewImage(fileStorageService.prepareUrl(baseUrl, offer.getPreviewImage()));
        fullOffer.setFeatures(offer.getFeatures()
                .stream().map(FeaturesEnum::getValue).collect(Collectors.toSet()));
        fullOffer.setCommentsCount(offer.getCommentsCount());

        fullOffer.setRating(offer.getRating());
        fullOffer.setFavorite(offer.isFavorite());
        fullOffer.setPremium(offer.isPremium());
        fullOffer.setAuthor(userService.mapToDto(offer.getAuthor()));
        fullOffer.setType(offer.getType().getValue());

        if (offer.getPhotos() != null) {
            fullOffer.setImages(offer.getPhotos().stream()
                    .map(photo -> fileStorageService.prepareUrl(baseUrl, photo))
                    .toList());
        }

        CityEnum cityEnum = offer.getCityEnum();
        if (cityEnum != null) {
            OfferDtoResponse.CityDto cityDto = new OfferDtoResponse.CityDto();
            cityDto.setName(cityEnum.getValue());
            cityDto.setLocation(new OfferDtoResponse.LocationDto(
                    cityEnum.getLatitude(),
                    cityEnum.getLongitude(),
                    cityEnum.getZoom()
            ));
            fullOffer.setCity(cityDto);
        }

        fullOffer.setLocation(new OfferDtoResponse.LocationDto(
                offer.getLatitude(),
                offer.getLongitude(),
                13
        ));

        return fullOffer;
    }
}
