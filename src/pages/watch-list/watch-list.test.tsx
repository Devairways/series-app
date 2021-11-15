import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import WatchList from './WatchList';

const renderComponent = (): RenderResult =>
  render(
    <MemoryRouter>
      <WatchList />
    </MemoryRouter>
  );

describe('WatchList tests', (): void => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => {
          return JSON.stringify([
            {
              Poster: 'https://m.media-amazon.com/images/M/MV5BY2ZhNTU4OGUtMTU4YS00NGM1LWFkM2QtODc2ODdhNTE0MjRhXkEyXkFqcGdeQXVyMzU3MTc5OTE@._V1_SX300.jpg',
              Title: 'Chase',
              Type: 'series',
              Year: '2010–2011',
              imdbID: 'tt1582458'
            }
          ]);
        }),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  test('component renders', async (): Promise<void> => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  test('content is retrieved from localStorage', (): void => {
    const { getByText } = renderComponent();

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(getByText('Chase')).toBeInTheDocument();
  });

  test('content is filtered by input', (): void => {
    const { getByTestId } = renderComponent();

    expect(getByTestId('counter')).toHaveTextContent('Total items: 1');

    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Purge' } });

    const button = getByTestId('search-button');
    fireEvent.click(button);

    expect(getByTestId('counter')).toHaveTextContent('Total items: 0');
  });
});
