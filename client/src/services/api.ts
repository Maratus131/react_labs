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

    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = getToken();

            if (token) {
                config.headers = config.headers ?? {};
                config.headers['Authorization'] = `Bearer ${token}`;

            }
            return config;

        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return api;
};
