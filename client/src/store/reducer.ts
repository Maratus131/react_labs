import { createReducer } from "@reduxjs/toolkit";
import { AuthorizationStatus, CITIES_LOCATION } from "../const";
import { getCity } from "../utils";
import { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData } from "./action";
import { CityOffer, OffersList } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";
import { UserData } from "../types/user-data";

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitalState = {
    isOffersDataLoading: boolean;
    city: CityOffer | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    userData: UserData | null;
}

const initialState: InitalState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: AuthorizationStatus.Unknown,
    error: null,
    isOffersDataLoading: false,
    userData: null,
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(offersCityList, (state, action) => {
            state.offers = action.payload;
        })
        .addCase(requireAuthorization, (state, action) => {
            state.authorizationStatus = action.payload;
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(setOffersDataLoadingStatus, (state, action) => {
            state.isOffersDataLoading = action.payload;
        })
        .addCase(setUserData, (state, action) => {
            state.userData = action.payload;
        })
        ;
        
});

export {reducer};