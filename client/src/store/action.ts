import { createAction } from "@reduxjs/toolkit";
import { CityOffer, FullOffer, OffersList } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";
import { UserData } from "../types/user-data";
import { Review } from "../types/reviews";

const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
    payload: city
}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

const fullOffer = createAction('offers/fullOffer', (offer: FullOffer) => ({
    payload: offer
}))

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

const setError = createAction('setError', (error: string | null) => ({
    payload: error
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
const setFullOfferDataLoadingStatus = createAction<boolean>('data/setFullOfferDataLoadingStatus');

const setUserData = createAction<UserData | null>('user/setUserData');

const setReviews = createAction('data/setReviews', (reviews: Review[]) => ({
    payload: reviews
}));

const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');

const setReviewSendingStatus = createAction<boolean>('data/setReviewSendingStatus');

const addReview = createAction('data/addReview', (review: Review) => ({
    payload: review
}));

export {
    changeCity,
    offersCityList,
    requireAuthorization,
    setError,
    setOffersDataLoadingStatus,
    setUserData,
    fullOffer,
    setFullOfferDataLoadingStatus,
    setReviews,
    setReviewsDataLoadingStatus,
    setReviewSendingStatus, 
    addReview
};