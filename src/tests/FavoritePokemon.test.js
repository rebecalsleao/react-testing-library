import { render, screen } from '@testing-library/react';
import React from 'react-router-dom';
// import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Teste se o componente Favorite Pokemon renderiza elementos específicos', () => {
  test('Se é exibida na tela a mensagem, caso a pessoa não tenha Pokémon favoritos;', () => {
    render(<FavoritePokemon />);
    const notFavoritePokemon = screen.getByText(/no favorite pokémon found/i);
    expect(notFavoritePokemon).toBeInTheDocument();
  });
//   test('Se é exibida na tela a mensagem o card do Pokémon favoritos;', () => {
//     renderWithRouter(<FavoritePokemon />);
//     const favoritePokemonCard = screen.getByText(/pikachu/i);
//     expect(favoritePokemonCard).toBeInTheDocument();
//   });
});

