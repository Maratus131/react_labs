import { JSX } from "react";
import { MainPage } from "../../pages/main-page/main-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";

type AppMainPageProps = {
    rentalOffersCount: number;
}

function App({rentalOffersCount}: AppMainPageProps):JSX.Element {
    return (
        <MainPage rentalOffersCount={rentalOffersCount}/>
        // <FavoritesPage/>
        // <LoginPage/>
        // <OfferPage/>
        // <NotFoundPage/>
    )
}

export default App;