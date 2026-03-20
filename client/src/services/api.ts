import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { dropToken, getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';
import { requireAuthorization } from '../store/action';
import { store } from '../store';
import { AuthorizationStatus } from '../const';

type DetailMessageType = {
    type: string;
    message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true,
}

const shouldDisplayError = (response: AxiosResponse) => !StatusCodeMapping[response.status];

const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = getToken();

            const isPublicGet =
                config.method === 'get' &&
                (
                    config.url?.startsWith('/offers') ||
                    config.url?.startsWith('/comments')
                );

            if (token && !isPublicGet) {
                config.headers = config.headers ?? {};
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError<DetailMessageType>) => {
            if (error.response?.status === StatusCodes.UNAUTHORIZED) {
                dropToken();
                store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            }

            if (error.response && shouldDisplayError(error.response)) {
                const detailMessage = (error.response.data);
                processErrorHandle(detailMessage.message);
            }
            throw error;
        }
    )
    return api;
};
