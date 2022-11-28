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
    const getButton = screen.getByTestId('next-pokemon');
    const elementPokemonName = screen.getByTestId('pokemon-name');

    expect(elementPokemonName).toBeInTheDocument();
    expect(elementPokemonName).toHaveTextContent(/pikachu/i);
    userEvent.click(getButton);
    expect(elementPokemonName).toHaveTextContent(/charmander/i);
    userEvent.click(getButton);
    expect(elementPokemonName).toHaveTextContent(/caterpie/i);
  });
  test('Se o primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista.', () => {
    renderWithRouter(<App />);
    const getButton = screen.getByTestId('next-pokemon');
    const elementPokemonName = screen.getByTestId('pokemon-name');

    // pokemonList.forEach((pokemon) => {
    //   if (pokemon === 'Dragonair') {
    //     userEvent.click(getButton);
    //     expect(elementPokemonName).toBeInTheDocument(/pikachu/i);
    //   }
    // });

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
    const getButton = screen.getByTestId('next-pokemon');
    const elementPokemonName = screen.getByTestId('pokemon-name');
    userEvent.click(getButton);
    expect(elementPokemonName).toBeInTheDocument(1);
  });
});
