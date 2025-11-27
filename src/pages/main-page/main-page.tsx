import { JSX, useState } from "react";
import { Logo } from "../../components/logo/logo";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { OffersList } from "../../types/offer";
import Map from "../../components/map/map";
import { useAppSelector } from "../../hooks";
import { getOffersByCity, sortOffersByType } from "../../utils";
import { CitiesList } from "../../components/cities-list/cities-list";
import { SortOffer } from "../../types/sort";
import { SortOptions } from "../../components/sort-options/sort-options";

function MainPage() {
    const [activeSort, setActiveSort] = useState<SortOffer>('Popular');

    const selectedCity = useAppSelector((state) => state.city);
    const offersList = useAppSelector((state) => state.offers);

    const selectedCityOffers = (selectedCity
        ? getOffersByCity(selectedCity.name, offersList)
        : []) || [];

    const rentalOffersCount = selectedCityOffers?.length;


    const defaultCityLocation = { lat: 52.3702, lng: 4.8952, zoom: 12 };

    const city = selectedCity
        ? {
            lat: selectedCity.location.latitude,
            lng: selectedCity.location.longitude,
            zoom: selectedCity.location.zoom,
        }
        : defaultCityLocation;

    const points = selectedCityOffers.map((o) => ({
        id: o.id,
        title: o.title,
        lat: o.location.latitude,
        lng: o.location.longitude,
    }));


    return (
        <div className="page page--gray page--main">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <a className="header__nav-link header__nav-link--profile" href="#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__user-name user__name">Myemail@gmail.com</span>
                                        <span className="header__favorite-count">3</span>
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

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
                            <CitiesCardList offersList={sortOffersByType(selectedCityOffers, activeSort)}
                            />
                        </section>
                        <div className="cities__right-section">
                            <section className="cities__map map">
                                <Map city={city} points={points} />
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export { MainPage };