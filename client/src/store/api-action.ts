import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "../types/state";
import { OffersList } from "../types/offer";
import { offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData } from "./action";
import { AuthorizationStatus, TIMEOUT_SHOW_ERROR } from "../const";
import { dropToken, saveToken } from "../services/token";
import { APIRoute } from "../const";
import { AuthData, UserData } from "../types/user-data";
import { store } from ".";

const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchOffers',
    async (_arg, { dispatch, extra: api }) => {
        dispatch(setOffersDataLoadingStatus(true));
        const { data } = await api.get<OffersList[]>(APIRoute.Offers);
        dispatch(offersCityList(data));
        dispatch(setOffersDataLoadingStatus(false));
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
            console.log('LOGIN RESPONSE:', data);
            saveToken(data.accessToken);
            await dispatch(checkAuthAction());


            dispatch(fetchOffersAction());
            return data;
        } catch (err) {
            dropToken();
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
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

export { fetchOffersAction, checkAuthAction, loginAction, logoutAction, clearErrorAction };
