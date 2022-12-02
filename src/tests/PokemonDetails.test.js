import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const ROUTE = '/pokemon/25';
describe('Testar o componente Pokemon Details', () => {
  test('Se a página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(ROUTE);
    });
    const nameOfDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(nameOfDetails).toBeInTheDocument();
  });

  test('Se a seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(ROUTE);
    });
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });
  test('Se a seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(ROUTE);
    });
    const detailsPokemon = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(detailsPokemon).toBeInTheDocument();
  });

  test('Se na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(ROUTE);
    });
    const gameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();
  });

  test('Se todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(ROUTE);
    });
    const locationPokemon = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(locationPokemon).toBeInTheDocument();
  });

  test('Se são exibidos o nome da localização e uma imagem do mapa em cada localização', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(ROUTE);
    });
    const firstLocation = screen.getByText(/kanto viridian forest/i);
    const secondLocation = screen.getByText(/kanto power plant/i);
    const firstLocationString = 'Kanto Viridian Forest';
    const secondLocationString = 'Kanto Power Plant';
    const imgs = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(firstLocation && secondLocation).toBeInTheDocument();
    expect(firstLocation).toHaveTextContent(firstLocationString);
    expect(secondLocation).toHaveTextContent(secondLocationString);
    expect(imgs[0] && imgs[1]).toBeInTheDocument();
  });

  test('Se o label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(ROUTE);
    });
    const labelCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(labelCheckbox).toBeInTheDocument();
  });
});
