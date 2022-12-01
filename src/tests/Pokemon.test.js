// import React from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testar componente Pokemon', () => {
  test('Se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const detailsPokemon = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsPokemon.href).toBe('http://localhost/pokemon/25');
  });

  test('Se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const detailsPokemon = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsPokemon);
    const detailsPokemonH2 = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(detailsPokemonH2).toBeInTheDocument();
  });
});

test('Se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
  const { history } = renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemon/25');
});

test('Se existe um ícone de estrela nos Pokémon favoritados', () => {
  renderWithRouter(<App />);
  const detailsPokemon = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(detailsPokemon);
  const button = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(button);
  const homeButton = screen.getByRole('link', {
    name: /home/i,
  });
  userEvent.click(homeButton);
  const iconFavorite = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(iconFavorite.src).toBe('http://localhost/star-icon.svg');
  expect(iconFavorite.alt).toBe('Pikachu is marked as favorite');
});
