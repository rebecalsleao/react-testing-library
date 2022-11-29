import React from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testar o componente Pokédex', () => {
  test('Teste se a página contém um heading h2 com texto específico', () => {
    renderWithRouter(<App />);
    const foundTagH2 = screen.getByRole('heading', { level: 2 });
    expect(foundTagH2).toBeInTheDocument();
    expect(foundTagH2).toHaveTextContent('Encountered Pokémon');
  });

  test('Se o botão contêm o texto específico', () => {
    renderWithRouter(<App />);
    const buttonText = screen.getByText('Próximo Pokémon');
    expect(buttonText).toBeInTheDocument();
  });

  test('Se os próximos Pokémon da lista são mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonNextPokemon);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Se o primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista.', () => {
    renderWithRouter(<App />);
    const getButton = screen.getByTestId('next-pokemon');
    const elementPokemonName = screen.getByTestId('pokemon-name');
    let pokemonName = elementPokemonName.innerHTML;

    while (pokemonName !== 'Dragonair') {
      userEvent.click(getButton);
      pokemonName = elementPokemonName.innerHTML;
    }
    userEvent.click(getButton);
    expect(elementPokemonName).toHaveTextContent(/pikachu/i);
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const elementPokemonName = screen.getByTestId('pokemon-name');
    expect(elementPokemonName).toHaveLength(1);
  });

  test('Se existe um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const buttonsPokemons = screen.getAllByTestId('pokemon-type-button');
    const buttonsLength = 7;
    const allButtons = screen.getByRole('button', { name: /all/i });

    expect(allButtons).toBeInTheDocument();
    expect(buttonsPokemons.length).toBe(buttonsLength);
    expect(buttonsPokemons[0]).toHaveTextContent('Electric');
    expect(buttonsPokemons[1]).toHaveTextContent('Fire');
    expect(buttonsPokemons[2]).toHaveTextContent('Bug');
    expect(buttonsPokemons[3]).toHaveTextContent('Poison');
    expect(buttonsPokemons[4]).toHaveTextContent('Psychic');
    expect(buttonsPokemons[5]).toHaveTextContent('Normal');
    expect(buttonsPokemons[6]).toHaveTextContent('Dragon');

    userEvent.click(buttonsPokemons[5]);
    const elementPokemon = screen.getByText(/snorlax/i);
    expect(elementPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();
  });
});
