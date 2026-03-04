import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FavoritesCardList } from "../../components/favorites-card-list/favorites-card-list";
import { Logo } from "../../components/logo/logo";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFavoriteOffersAction } from "../../store/api-action";
import { OffersList } from "../../types/offer";
import AppHeader from "../../components/app-header/app-header";

const groupByCity = (offers: OffersList[]) => {
    return offers.reduce<Record<string, OffersList[]>>((acc, offer) => {
        const cityName = offer.city.name;

        if (!acc[cityName]) {
            acc[cityName] = [];
        }

        acc[cityName].push(offer);

        return acc;
    }, {});
};

function FavoritesPage() {
    const dispatch = useAppDispatch();
    const favoritesOffers = useAppSelector((state) => state.favoriteOffers);
    const groupedFavorites = groupByCity(favoritesOffers);

    const isEmpty = favoritesOffers.length === 0;

    useEffect(() => {
        dispatch(fetchFavoriteOffersAction());
    }, [dispatch]);

    return (
        <div className="page">
            <AppHeader />

            <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                    <section className="favorites">
                        <h1 className="favorites__title">Saved listing</h1>

                        {isEmpty ? (
                            <p>No saved offers yet</p>
                        ) : (
                            <ul className="favorites__list">
                                {Object.entries(groupedFavorites).map(
                                    ([cityName, offers]) => (
                                        <li
                                            key={cityName}
                                            className="favorites__locations-items"
                                        >
                                            <div className="favorites__locations locations locations--current">
                                                <div className="locations__item">
                                                    <Link
                                                        className="locations__item-link"
                                                        to="/"
                                                    >
                                                        <span>{cityName}</span>
                                                    </Link>
                                                </div>
                                            </div>

                                            <FavoritesCardList offersList={offers} />
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </section>
                </div>
            </main>

            <footer className="footer container">
                <Link className="footer__logo-link" to="/">
                    <img
                        className="footer__logo"
                        src="img/logo.svg"
                        alt="Rent service logo"
                        width="64"
                        height="33"
                    />
                </Link>
            </footer>
        </div>
    );
}

export { FavoritesPage }
