import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import AppHeader from '../components/app-header/app-header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';
import { makeFakeOffer } from './mocks';

const fakeUserInfo = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    avatar: 'https://example.com/avatar.jpg',
    isPro: false,
    accessToken: 'fake-token',
};

describe('Header — неавторизованный пользователь', () => {
    it('отображает ссылку Sign in', () => {
        renderWithProviders(<AppHeader />);
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it('не отображает Sign out', () => {
        renderWithProviders(<AppHeader />);
        expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });
});

describe('Header — авторизованный пользователь', () => {
    it('показывает email пользователя и кнопку Sign out', () => {
        renderWithProviders(<AppHeader />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userData: fakeUserInfo,
            },
        });

        expect(screen.getByText(fakeUserInfo.email)).toBeInTheDocument();
        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
        expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    });

    it('показывает количество избранных', () => {
        const offers = [
            { ...makeFakeOffer(), isFavorite: true },
            { ...makeFakeOffer(), isFavorite: false },
            { ...makeFakeOffer(), isFavorite: true },
        ];

        renderWithProviders(<AppHeader />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userData: fakeUserInfo,
                offers,
            },
        });

        expect(screen.getByText('2')).toBeInTheDocument();
    });
});

describe('Header — Unknown', () => {
    it('отображает ссылку Sign in', () => {
        renderWithProviders(<AppHeader />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Unknown,
            },
        });

        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });
});
