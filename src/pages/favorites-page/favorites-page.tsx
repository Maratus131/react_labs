import { FavoritesCardList } from "../../components/favorites-card-list/favorites-card-list";
import { Logo } from "../../components/logo/logo";
import { OffersList } from "../../types/offer";
import { getFavoritesOffers } from "../../utils";

type FavoritesPageProps = {
    offersList: OffersList[];
};

// группировка избранных по городам
function groupByCity(favorites: OffersList[]) {
    const result: Record<string, OffersList[]> = {};

    favorites.forEach((offer) => {
        const city = offer.city.name;

        if (!result[city]) {
            result[city] = [];
        }

        result[city].push(offer);
    });

    return result;
}

function FavoritesPage({ offersList }: FavoritesPageProps) {
    const favoritesOffers = getFavoritesOffers(offersList) ?? [];
    const groupedFavorites = groupByCity(favoritesOffers);

    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                    <section className="favorites">
                        <h1 className="favorites__title">Saved listing</h1>

                        <ul className="favorites__list">
                            {Object.entries(groupedFavorites).map(([cityName, offers]) => (
                                <li key={cityName} className="favorites__locations-items">
                                    <div className="favorites__locations locations locations--current">
                                        <div className="locations__item">
                                            <a className="locations__item-link" href="#">
                                                <span>{cityName}</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* карточки только этого города */}
                                    <FavoritesCardList offersList={offers} />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

            <footer className="footer container">
                <a className="footer__logo-link" href="main.html">
                    <img
                        className="footer__logo"
                        src="img/logo.svg"
                        alt="Rent service logo"
                        width="64"
                        height="33"
                    />
                </a>
            </footer>
        </div>
    );
}

export { FavoritesPage }