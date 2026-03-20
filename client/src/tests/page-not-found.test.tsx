import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoadingPage from "../components/loading-page/loading-page";
import { NotFoundPage } from '../pages/not-found-page/not-found-page';


describe('LoadingPage', () => {
  it('отображает текст загрузки', () => {
    render(<LoadingPage />);

    expect(
      screen.getByAltText(/loading/i)
    ).toBeInTheDocument();
  });
});


describe('PageNotFound', () => {
  const renderPage = () => render(
    <MemoryRouter><NotFoundPage /></MemoryRouter>
  );


  it('отображает заголовок PAGE NOT FOUND', () => {
    renderPage();

    expect(
      screen.getByText(/404\. page not found/i)
    ).toBeInTheDocument();
  });


  it('ссылка на главную страницу присутствует', () => {
    renderPage();

    expect(
      screen.getByRole('link', { name: /6 cities logo/i })
    ).toBeInTheDocument();
  });


  it('ссылка ведет на "/"', () => {
    renderPage();

    const link = screen.getByRole('link', { name: /6 cities logo/i });

    expect(link).toHaveAttribute('href', '/');
  });
});
