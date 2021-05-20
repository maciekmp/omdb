import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const response = {
  Search: [
    {
      Title: 'Haker2',
      Year: '2002',
      imdbID: 'tt0338086',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BYjlhNGEyM2ItNDM1Yi00NDMyLTkxM2UtMzI5MmNhMTg0ZmIwXkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_SX300.jpg'
    }
  ]
};

const server = setupServer(
  rest.get('http://www.omdbapi.com/*', (req, res, ctx) => {
    return res(ctx.json(response));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders main component', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
test('renders subcomponent before request', () => {
  const { container } = render(<App />);
  const input = screen.getByPlaceholderText('movie title...');
  expect(input).toBeInTheDocument();
  const loading = screen.queryByText('loading');
  expect(loading).toBeNull();
  const list = container.querySelector('ul');
  expect(list).toBeNull();
});
test('loading appear and request is run after press enter', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('movie title...');
  fireEvent.change(input, { target: { value: 'haker' } });
  fireEvent.keyDown(input, { code: 'Enter' });
  const loading = await screen.findByText('loading');
  expect(loading).toBeInTheDocument();
  await screen.findByTestId('list');
});
test('after request is done the list of titles apepar', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('movie title...');
  fireEvent.change(input, { target: { value: 'haker' } });
  fireEvent.keyDown(input, { code: 'Enter' });
  const list = await screen.findByTestId('list');
  expect(list).toBeInTheDocument();
});
test('titles are visible on the screen', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('movie title...');
  fireEvent.change(input, { target: { value: 'haker' } });
  fireEvent.keyDown(input, { code: 'Enter' });
  const movie = await screen.findByText('Haker2');
  expect(movie).toBeInTheDocument();
});
