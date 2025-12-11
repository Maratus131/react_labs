import { SortOffersType } from "./const";
import { CityOffer, OffersList } from "./types/offer";
import { SortOffer } from "./types/sort";

export function getCity(cityName: string, cities: CityOffer[]): CityOffer | undefined {
    return cities.find((city) => city.name.toLowerCase() === cityName.toLowerCase());
}

export function getOffersByCity(cityName: string, offers: OffersList[]): OffersList[] | undefined {
    return offers.filter((offer) => offer.city.name.toLowerCase() === cityName.toLowerCase());
}

export function getFavoritesOffers(offers: OffersList[]): OffersList[] | undefined {
    return offers.filter((offer) => offer.isFavorite)
}

export function getFavoritesLength(offers: OffersList[]){
    return offers.filter((offer) => offer.isFavorite).length
}

export function sortOffersByType(offers: OffersList[], type: SortOffer): OffersList[] {
    switch (type) {
        case SortOffersType.PriceToHigh:
            return offers.sort((a, b) => a.price - b.price);
        case SortOffersType.PriceToLow:
            return offers.sort((a, b) => b.price - a.price);
        case SortOffersType.TopRated:
            return offers.sort((a, b) => b.rating - a.rating);
        default:
            return offers;

    }
}