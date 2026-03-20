import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { PlaceCard } from '../components/place-card/place-card';
import { renderWithProviders } from './render-with-providers';
import { makeFakeOffer } from './mocks';
import { AppRoute } from '../const';

type Offer = ReturnType<typeof makeFakeOffer>;

function renderCitiesCard(offerOverrides: Partial<Offer> = {}) {
  const offer: Offer = {
    ...makeFakeOffer(),
    ...offerOverrides,
  };

  return renderWithProviders(
    <PlaceCard
      {...offer}
      cardClassName="cities__card"
      imgWrapperClass="cities__image-wrapper"
      imgWidth={260}
      imgHeight={200}
    />
  );
}

describe('CitiesCard (PlaceCard)', () => {
  it('показывает заголовок объявления', () => {
    const title = 'Test Offer Title';
    renderCitiesCard({ title });

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('показывает цену объявления', () => {
    const price = 120;
    renderCitiesCard({ price });

    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
  });

  it('показывает метку Premium, когда isPremium = true', () => {
    renderCitiesCard({ isPremium: true });

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('не показывает метку Premium, когда isPremium = false', () => {
    renderCitiesCard({ isPremium: false });

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href', () => {
    const id = 'offer-1';
    const title = 'Test Offer Title';
    renderCitiesCard({ id, title });

    const link = screen.getByRole('link', { name: title });
    expect(link).toHaveAttribute('href', `${AppRoute.Offer}/${id}`);
  });
});
