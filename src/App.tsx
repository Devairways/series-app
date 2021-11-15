import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavBar } from './components';
import Home from './pages/home/Home';
import SeriesDetail from './pages/series-detail/SeriesDetail';
import WatchList from './pages/watch-list/WatchList';

const App = () => (
  <div className="app">
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/series/:id" element={<SeriesDetail />} />
      <Route path="/watchlist" element={<WatchList />} />
    </Routes>
  </div>
);

export default App;
