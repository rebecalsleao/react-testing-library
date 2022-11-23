import React from 'react-router-dom';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testar o componente Not Found', () => {
  test('Se a página contém um heading h2 com texto específico', () => {
    renderWithRouter(<NotFound />);
    const foundTagH2 = screen.getByRole('heading', { level: 2 });
    const foundTextH2 = screen.getByText('Page requested not found');
    expect(foundTagH2).toBeInTheDocument();
    expect(foundTextH2).toBeInTheDocument();
  });
  test('Se a página contem o atributo src da imagem', () => {
    renderWithRouter(<NotFound />);
    const foundImage = screen.getByRole('img');
    expect(foundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
