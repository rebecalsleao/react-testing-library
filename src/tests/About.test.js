import React from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém as informações específicas sobre a Pokédex', () => {
    render(<About />);
    const getTag = screen.getByRole('heading', { level: 2 });
    expect(getTag).toBeInTheDocument();
    expect(getTag).toHaveTextContent('About Pokédex');
  });
  test('Teste se a página contém as informações específicas na tag de parágrafo', () => {
    render(<About />);
    const getTextP1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i,
    );
    const getTextP2 = screen.getByText(
      /One can filter Pokémon by type, and see more details for each one of them/i,
    );
    expect(getTextP1).toBeInTheDocument();
    expect(getTextP2).toBeInTheDocument();
  });
  test('Se a página contem o atributo src da imagem', () => {
    renderWithRouter(<About />);
    const foundImage = screen.getByRole('img', { name: 'Pokédex' });
    expect(foundImage).toBeInTheDocument();
    expect(foundImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
