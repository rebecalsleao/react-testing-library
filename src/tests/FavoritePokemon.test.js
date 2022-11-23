import { render, screen } from '@testing-library/react';
import React from 'react-router-dom';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Teste se o componente Favorite Pokemon renderiza elementos específicos', () => {
  test('Se é exibida na tela a mensagem, caso a pessoa não tenha Pokémon favoritos;', () => {
    render(<FavoritePokemon />);
    const notFavoritePokemon = screen.getByText(/no favorite pokémon found/i);
    expect(notFavoritePokemon).toBeInTheDocument();
  });
});
