import { CityOffer } from "./types/offer";

const TIMEOUT_SHOW_ERROR = 2000;

const APIRoute = {
    Offers: '/offers',
    Login: '/login',
    Logout: '/logout',
    Comments: '/comments',
    Favorite: '/favorite',
}

const Setting = {
    rentOffersCount: 312,
} as const;

const AppRoute = {
    Main: '/',
    Login: '/login',
    Favorites: '/favorites',
    Offer: '/offers',
} as const;

const AuthorizationStatus = {
    Auth: 'AUTH',
    NoAuth: 'NO_AUTH',
    Unknown: 'UNKNOWN',
}

const CITIES_LOCATION: CityOffer[] = [
    {
        name: 'Paris',
        location: {
            latitude: 48.5112,
            longitude: 2.2055,
            zoom: 8
        }
    },
    {
        name: 'Cologne',
        location: {
            latitude: 50.9375,
            longitude: 6.9603,
            zoom: 8
        }
    },
    {
        name: 'Brussels',
        location: {
            latitude: 50.8503,
            longitude: 4.3517,
            zoom: 8
        }
    },
    {
        name: 'Amsterdam',
        location: {
            latitude: 52.2226,
            longitude: 4.5322,
            zoom: 8
        }
    },
    {
        name: 'Hamburg',
        location: {
            latitude: 53.5511,
            longitude: 9.9937,
            zoom: 8
        }
    },
    {
        name: 'Dusseldorf',
        location: {
            latitude: 51.2277,
            longitude: 6.7735,
            zoom: 8
        }
    },
];

const SortOffersType = {
    Popular: 'Popular',
    PriceToHigh: 'Price: low to high',
    PriceToLow: 'Price: high to low',
    TopRated: 'Top rated first'
}


export { TIMEOUT_SHOW_ERROR, Setting, AppRoute, AuthorizationStatus, CITIES_LOCATION, SortOffersType, APIRoute};