import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testar o componente Pokemon Details', () => {
  test('Se a página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado', () => {
    renderWithRouter(<App />);
    const detailsPokemon = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsPokemon);
    expect(detailsPokemonH2).not.toBeInTheDocument();
  });

  test('Se a seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });

  test('Se a seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    renderWithRouter(<App />);
    const detailsPokemon = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(detailsPokemon).toBeInTheDocument();
  });

  test('Se na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const gameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();
  });
  test('Se todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    renderWithRouter(<App />);
    const locationPokemon = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(locationPokemon).toBeInTheDocument();
  });

  test('Se são exibidos o nome da localização e uma imagem do mapa em cada localização', () => {
    renderWithRouter(<App />);
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

  test('Se a imagem da localização tem um atributo src com a URL da localização;', () => {
    renderWithRouter(<App />);
    const firstImageUrl = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const secondImageUrl = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imgs[0]).toHaveAttribute('src', firstImageUrl);
    expect(imgs[1]).toHaveAttribute('src', secondImageUrl);
  });

  test('Se a imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const imageLocation = screen.getAllByRole('img', { name: /Pikachu location/i });
    const altImageLocation = screen.getByText(/pikachu location/i);
    expect(imageLocation).toHaveAttribute('alt', altImageLocation);
  });

  test('Se a página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<App />);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
  });

  test('Se cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos', () => {
    renderWithRouter(<App />);
    const addToFavorites = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(addToFavorites);
    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
  });

  test('Se o label do checkbox deve conter o texto Pokémon favoritado?', () => {
    renderWithRouter(<App />);
    const labelCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(labelCheckbox).toBeInTheDocument();
  });
});
