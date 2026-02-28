import { JSX } from "react";
import { MainPage } from "../../pages/main-page/main-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { LoginPage } from "../../pages/login-page/login-page";
// import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { PrivateRoute } from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import LoadingPage from "../loading-page/loading-page";
import { OfferPage } from "../../pages/offer-page/offer-page";

function App(): JSX.Element {

    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isQuesttionsDataLoading = useAppSelector((state) => state.isOffersDataLoading);

    if (authorizationStatus === AuthorizationStatus.Unknown || isQuesttionsDataLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={AppRoute.Main}
                    element={<MainPage />}
                />
                <Route
                    path={AppRoute.Login}
                    element={<LoginPage />}
                />
                <Route
                    path={`${AppRoute.Offer}/:id`}
                    element={<OfferPage />}
                />
                {/* <Route
                    path={AppRoute.Favorites}
                    element={
                        <PrivateRoute
                            authorizationStatus={authorizationStatus}
                        >
                            <FavoritesPage />
                        </PrivateRoute>
                    }
                /> */}
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;