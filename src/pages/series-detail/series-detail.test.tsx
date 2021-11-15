import { render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SeriesDetail from './SeriesDetail';

const renderComponent = (): RenderResult => {
  return render(
    <BrowserRouter>
      <Routes location={'/series/tt1582458'}>
        <Route path={'/series/:id'} element={<SeriesDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

describe('SeriesDetail tests', (): void => {
  test('component renders', async (): Promise<void> => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  test('content is retrieved from api', async (): Promise<void> => {
    const { getAllByText } = renderComponent();

    await waitFor(() => {
      const title = getAllByText('Chase')[0];
      expect(title).toBeInTheDocument();
    });
  });
});
