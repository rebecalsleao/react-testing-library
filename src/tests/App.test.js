import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('Se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
  });

  test('Se o primeiro link possui o texto About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();
  });

  test('Se o primeiro link possui o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const favoritePokémonLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favoritePokémonLink).toBeInTheDocument();
  });
});
