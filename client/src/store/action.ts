import { createAction } from "@reduxjs/toolkit";
import { CityOffer, OffersList } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";

const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
    payload: city
}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

const setError = createAction('setError', (error: string | null) => ({
    payload: error
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus };