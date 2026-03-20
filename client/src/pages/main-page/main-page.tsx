import { useState } from "react";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import Map from "../../components/map/map";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getOffersByCity, sortOffersByType } from "../../utils";
import { CitiesList } from "../../components/cities-list/cities-list";
import { SortOffer } from "../../types/sort";
import { SortOptions } from "../../components/sort-options/sort-options";
import AppHeader from "../../components/app-header/app-header";

function MainPage() {
    const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>(undefined);
    const [activeSort, setActiveSort] = useState<SortOffer>('Popular');

    const selectedCity = useAppSelector((state) => state.city);
    const offersList = useAppSelector((state) => state.offers);

    const selectedCityOffers = (selectedCity
        ? getOffersByCity(selectedCity.name, offersList)
        : []) || [];

    console.log(selectedCityOffers);

    const rentalOffersCount = selectedCityOffers?.length;

    const defaultCityLocation = { lat: 52.3702, lng: 4.8952, zoom: 19 };

    const activeCityLat =
        selectedCityOffers[0]?.location.latitude ??
        selectedCity?.location.latitude ??
        defaultCityLocation.lat;

    const activeCityLng =
        selectedCityOffers[0]?.location.longitude ??
        selectedCity?.location.longitude ??
        defaultCityLocation.lng;

    const city = selectedCity
        ? {
            lat: activeCityLat,
            lng: activeCityLng,
            zoom: 13,
        }
        : defaultCityLocation;

    const points = selectedCityOffers.map((o) => ({
        id: o.id,
        title: o.title,
        lat: o.location.latitude,
        lng: o.location.longitude,
    }));


    const handleListItemHover = (offerId: string | undefined) => {
        setSelectedOfferId(offerId);
    };

    return (
        <div className="page page--gray page--main">
           <AppHeader/>

            <main className="page__main page__main--index">
                <h1 className="visually-hidden">Cities</h1>
                <div className="tabs">
                    <section className="locations container">
                        <CitiesList selectedCity={selectedCity} />
                    </section>
                </div>
                <div className="cities">
                    <div className="cities__places-container container">
                        <section className="cities__places places">
                            <h2 className="visually-hidden">Places</h2>
                            <SortOptions activeSorting={activeSort} onChange={(newSorting) => setActiveSort(newSorting)} />
                            <b className="places__found">{rentalOffersCount} places to stay in {selectedCity?.name}</b>
                            <CitiesCardList
                                offersList={sortOffersByType(selectedCityOffers, activeSort)}
                                onListItemHover={handleListItemHover}
                            />
                        </section>
                        <div className="cities__right-section">
                            <section className="cities__map map">
                                <Map city={city} points={points} selectedPointId={selectedOfferId} />
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export { MainPage };