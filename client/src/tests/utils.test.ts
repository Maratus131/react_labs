import { describe, it, expect } from 'vitest';
import { makeFakeOffer } from './mocks';
import { SortOffersType, CITIES_LOCATION } from '../const';
import { getCity, getFavoritesOffers, getOffersByCity, sortOffersByType } from '../utils';
import { SortOffer } from '../types/sort';

describe('getOffersByCity', () => {
    it("Возврщает только объявления указанного города", () => {
        const paris = CITIES_LOCATION[0];
        const cologne = CITIES_LOCATION[1];
        const parisOffer = { ...makeFakeOffer(), city: paris };
        const cologneOffer = { ...makeFakeOffer(), city: cologne };


        const result = getOffersByCity('Paris', [parisOffer, cologneOffer])!;

        expect(result).toBeDefined();
        expect(result).toHaveLength(1);
        expect(result[0]?.city.name).toBe('Paris');
    });

    it('возвращает пустой массив, если город не найден', () => {
        const offers = [makeFakeOffer(), makeFakeOffer()];
        expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
    });

    it('возвращает пустой массив при пустом списке предложений', () => {
        expect(getOffersByCity('Paris', [])).toEqual([]);
    });
})

describe('sortOffersByType', () => {
    it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
        const offers = [
            { ...makeFakeOffer(), price: 300 },
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 200 },
        ];

        const result = sortOffersByType([...offers], SortOffersType.PriceToHigh as SortOffer);

        expect(result[0].price).toBe(100);
        expect(result[2].price).toBe(300);
    });

    it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
        const offers = [
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 300 },
        ];


        const result = sortOffersByType([...offers], SortOffersType.PriceToLow as SortOffer);


        expect(result[0].price).toBe(300);
    });

    it('сортирует по рейтингу', () => {
        const offers = [
            { ...makeFakeOffer(), rating: 3 },
            { ...makeFakeOffer(), rating: 5 },
            { ...makeFakeOffer(), rating: 4 },
        ];


        const result = sortOffersByType([...offers], SortOffersType.TopRated as SortOffer);
        expect(result[0].rating).toBe(5);
    });

    it('не изменяет исходный массив', () => {
        const offers = [
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 200 },
        ];

        const copy = [...offers];

        sortOffersByType(offers, SortOffersType.PriceToHigh as SortOffer);

        expect(offers).toEqual(copy);
    });

    it('возвращает пустой массив при пустом списке предложений', () => {
        const result = sortOffersByType([], SortOffersType.PriceToHigh as SortOffer);
        expect(result).toEqual([]);
    })
});

describe('getCity', () => {
    it('возвращает город по имени (без учета регистра)', () => {
        const city = CITIES_LOCATION[0]
        const result = getCity(city.name.toLowerCase(), CITIES_LOCATION);
        expect(result).toBeDefined();
        expect(result?.name).toBe(city.name);
    })

    it('возвращает undefined, если город не найден', () => {
        const result = getCity('Tokyo', CITIES_LOCATION);
        expect(result).toBeUndefined();
    });

    it('возвращает undefined при пустом списке городов', () => {
        const result = getCity('Paris', []);
        expect(result).toBeUndefined();
    });
})

describe('getFavoritesOffers', () => {
    it('возвращает только избранные предложения', () => {
        const favorite = { ...makeFakeOffer(), isFavorite: true };
        const notFavorite = { ...makeFakeOffer(), isFavorite: false };

        const result = getFavoritesOffers([favorite, notFavorite])!;

        expect(result).toHaveLength(1);
        expect(result[0].isFavorite).toBe(true);
    });

    it('возвращает пустой массив, если нет избранных', () => {
        const offers = [
            { ...makeFakeOffer(), isFavorite: false },
            { ...makeFakeOffer(), isFavorite: false },
        ];

        const result = getFavoritesOffers(offers);

        expect(result).toEqual([]);
    });

    it('возвращает пустой массив при пустом списке', () => {
        const result = getFavoritesOffers([]);
        expect(result).toEqual([]);
    });
});
