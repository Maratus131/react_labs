import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "../types/state";
import { FullOffer, OffersList } from "../types/offer";
import { offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData, fullOffer, setFullOfferDataLoadingStatus, setReviews, setReviewsDataLoadingStatus, setReviewSendingStatus, addReview, favoriteOffer, setFavoriteOfferDataLoadingStatus, toogleFavoriteOffer } from "./action";
import { AuthorizationStatus, TIMEOUT_SHOW_ERROR } from "../const";
import { dropToken, saveToken } from "../services/token";
import { APIRoute } from "../const";
import { AuthData, UserData } from "../types/user-data";
import { store } from ".";
import { Review } from "../types/reviews";

const fetchFullOfferAction = createAsyncThunk<
    FullOffer,
    string,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
        rejectValue: string;
    }
>(
    'data/fetchFullOffer',
    async (offerId, { dispatch, extra: api, rejectWithValue }) => {
        try {
            dispatch(setFullOfferDataLoadingStatus(true));

            const { data } = await api.get(`${APIRoute.Offers}/${offerId}`);

            const mappedOffer: FullOffer = {
                id: String(data.id),
                title: data.title,
                type: data.type,
                price: data.price,
                city: data.city,
                location: data.location,
                isFavorite: data.favorite ?? data.isFavorite,
                isPremium: data.premium,
                rating: data.rating,
                description: data.description,
                bedrooms: data.rooms,
                goods: data.features,
                host: {
                    name: data.author.username,
                    avatarUrl: data.author.avatarUrl,
                    isPro: data.author.pro,
                },
                images: data.images,
                maxAdults: data.guests,
            };

            dispatch(fullOffer(mappedOffer));
            dispatch(setFullOfferDataLoadingStatus(false));

            return mappedOffer;
        } catch {
            dispatch(setFullOfferDataLoadingStatus(false));
            dispatch(setError('Failed to load offer'));

            return rejectWithValue('Failed to load offer');
        }
    }
);

const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchOffers',
    async (_arg, { dispatch, extra: api }) => {
        dispatch(setOffersDataLoadingStatus(true));
        try {
            const { data } = await api.get(APIRoute.Offers);

            const mappedOffers = data.map((offer: any) => ({
                id: String(offer.id),
                title: offer.title,
                type: offer.type,
                price: offer.price,
                city: offer.city,
                location: offer.location,
                isFavorite: offer.favorite ?? offer.isFavorite,
                isPremium: offer.premium,
                rating: offer.rating,
                previewImage: offer.previewImage,
            }));

            dispatch(offersCityList(mappedOffers));
        } finally {
            dispatch(setOffersDataLoadingStatus(false));
        }
    },
);

const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchFavoriteOffers',
    async (_arg, { dispatch, extra: api }) => {
        dispatch(setFavoriteOfferDataLoadingStatus(true));
        try {
            const { data } = await api.get(APIRoute.Favorite);

            const mappedOffers = data.map((offer: any) => ({
                id: String(offer.id),
                title: offer.title,
                type: offer.type,
                price: offer.price,
                city: offer.city,
                location: offer.location,
                isFavorite: offer.favorite ?? offer.isFavorite,
                isPremium: offer.premium,
                rating: offer.rating,
                previewImage: offer.previewImage,
            }));

            dispatch(favoriteOffer(mappedOffers));
        } finally {
            dispatch(setFavoriteOfferDataLoadingStatus(false));
        }
    },
);


const checkAuthAction = createAsyncThunk<
    UserData,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
        rejectValue: string;
    }
>(
    'user/checkAuth',
    async (_arg, { dispatch, extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<UserData>(APIRoute.Login);

            dispatch(requireAuthorization(AuthorizationStatus.Auth));
            dispatch(setUserData(data));

            return data;
        } catch {
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setUserData(null));

            return rejectWithValue('Auth check failed');
        }
    },
);

const loginAction = createAsyncThunk<
    UserData,
    AuthData,
    { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
    'user/login',
    async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
            saveToken(data.accessToken);
            await dispatch(checkAuthAction());

            dispatch(fetchOffersAction());
            return data;
        } catch (err) {
            dropToken();
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setError('Login failed'));
            dispatch(clearErrorAction());
            return rejectWithValue("Login failed");
        }
    }
);

const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/logout',
    async (_arg, { dispatch, extra: api }) => {
        await api.delete(APIRoute.Logout);
        dropToken();
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    },
);

const clearErrorAction = createAsyncThunk(
    'clearError',
    () => {
        setTimeout(
            () => store.dispatch(setError(null)),
            TIMEOUT_SHOW_ERROR,
        );
    },
);

const fetchReviewsAction = createAsyncThunk<
    void,
    string,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>(
    'data/fetchReviews',
    async (offerId, { dispatch, extra: api, rejectWithValue }) => {
        try {
            dispatch(setReviewsDataLoadingStatus(true));

            const { data } = await api.get<any[]>(`${APIRoute.Comments}/${offerId}`);

            const mappedReviews: Review[] = data.map((item) => ({
                id: item.reviewId,
                comment: item.comment,
                rating: item.rating,
                date: item.date,
                user: {
                    name: item.user.username,
                    avatarUrl: item.user.avatarUrl,
                    isPro: item.user.pro
                }
            }));

            dispatch(setReviews(mappedReviews));
            dispatch(setReviewsDataLoadingStatus(false));
        } catch (error) {
            dispatch(setReviewsDataLoadingStatus(false));
            return rejectWithValue('Failed to load reviews');
        }
    }
);

const sendReviewAction = createAsyncThunk<
    Review,
    { offerId: string; comment: string; rating: number, userId: string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
        rejectValue: string;
    }
>(
    'data/sendReview',
    async ({ offerId, comment, rating }, { dispatch, getState, extra: api, rejectWithValue }) => {
        const { authorizationStatus } = getState();

        if (authorizationStatus !== AuthorizationStatus.Auth) {
            return rejectWithValue('User is not authorized');
        }

        try {
            dispatch(setReviewSendingStatus(true));

            const { data } = await api.post(
                `${APIRoute.Comments}`,
                {
                    comment,
                    rating,
                    offerId,
                    userId: getState().userData?.id
                }
            );

            const userData = getState().userData;

            const mappedReview: Review = {
                id: String(data.reviewId),
                comment: data.comment,
                rating: data.rating,
                date: new Date().toISOString(),
                user: {
                    name: userData?.name ?? '',
                    avatarUrl: userData?.avatar ?? '',
                    isPro: userData?.isPro ?? false
                }
            };

            dispatch(addReview(mappedReview));

            await dispatch(fetchReviewsAction(offerId));

            dispatch(setReviewSendingStatus(false));

            return mappedReview;
        } catch {
            dispatch(setReviewSendingStatus(false));
            return rejectWithValue('Failed to post review');
        }
    }
);

const toggleFavoriteOfferAction = createAsyncThunk<
  OffersList,
  { offerId: string; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/toggleFavoriteOffer',
  async ({ offerId, status }, { dispatch, extra: api }) => {

    const { data } = await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);

    const mappedOffer: OffersList = {
      id: String(data.id),
      title: data.title,
      type: data.type,
      price: data.price,
      city: data.city,
      location: data.location,
      isFavorite: data.favorite ?? data.isFavorite,
      isPremium: data.premium,
      rating: data.rating,
      previewImage: data.previewImage,
    };

    dispatch(toogleFavoriteOffer(mappedOffer));
    dispatch(fetchFavoriteOffersAction());

    return mappedOffer;
  }
);

export {
    fetchOffersAction,
    checkAuthAction,
    loginAction,
    toggleFavoriteOfferAction,
    logoutAction,
    clearErrorAction,
    fetchFullOfferAction,
    fetchReviewsAction,
    sendReviewAction,
    fetchFavoriteOffersAction
};





