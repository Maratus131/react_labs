import { createReducer } from "@reduxjs/toolkit";
import { AuthorizationStatus, CITIES_LOCATION } from "../const";
import { getCity } from "../utils";
import { addReview, changeCity, favoriteOffer, fullOffer, offersCityList, requireAuthorization, setError, setFavoriteOfferDataLoadingStatus, setFullOfferDataLoadingStatus, setOffersDataLoadingStatus, setReviews, setReviewsDataLoadingStatus, setReviewSendingStatus, setUserData } from "./action";
import { CityOffer, FullOffer, OffersList } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";
import { UserData } from "../types/user-data";
import { Review } from "../types/reviews";

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitalState = {
    isOffersDataLoading: boolean;
    city: CityOffer | undefined;
    offers: OffersList[];
    fullOffer: FullOffer | null;
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    userData: UserData | null;
    isFullOfferDataLoading: boolean;
    reviews: Review[];
    isReviewsDataLoading: boolean;
    isReviewSending: boolean;
    isFavoriteOfferDataLoading: boolean;
    favoriteOffers: OffersList[];
}

const initialState: InitalState = {
    city: defaultCity,
    offers: [],
    fullOffer: null,
    authorizationStatus: AuthorizationStatus.Unknown,
    error: null,
    isOffersDataLoading: false,
    userData: null,
    isFullOfferDataLoading: false,
    reviews: [],
    isReviewsDataLoading: false,
    isReviewSending: false,
    isFavoriteOfferDataLoading: false,
    favoriteOffers: [],
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
        .addCase(fullOffer, (state, action) => {
            state.fullOffer = action.payload;
        })
        .addCase(setFullOfferDataLoadingStatus, (state, action) => {
            state.isFullOfferDataLoading = action.payload;
        })
        .addCase(setReviews, (state, action) => {
            state.reviews = action.payload;
        })
        .addCase(setReviewsDataLoadingStatus, (state, action) => {
            state.isReviewsDataLoading = action.payload;
        })
        .addCase(setReviewSendingStatus, (state, action) => {
            state.isReviewSending = action.payload;
        })
        .addCase(addReview, (state, action) => {
            state.reviews = [action.payload, ...state.reviews];
        })
        .addCase(setFavoriteOfferDataLoadingStatus, (state, action) => {
            state.isFavoriteOfferDataLoading = action.payload;
        })
        .addCase(favoriteOffer, (state, action) => {
            state.favoriteOffers = action.payload;
        });

});

export { reducer };