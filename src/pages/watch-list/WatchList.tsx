import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { SeriesListModel } from '../../api-services/api-models/seriesModels';
import { Backdrop } from '../../components';
import useWindowDimensions from '../../helpers/windowDimensions';
import SearchInput from './components/SearchInput';
import WatchListItems from './components/WatchListItems';
import classes from './watch-list.module.scss';

const WatchList = () => {
  const { isMobile } = useWindowDimensions();

  const [seriesList, setSeriesList] = useState<{
    results: SeriesListModel[];
    totalItems: number;
    checked: boolean;
  }>({ results: [], totalItems: 0, checked: false });
  const originalWatchList = useRef<SeriesListModel[]>(JSON.parse(localStorage.getItem('watch-list') || '[]'));

  const filterSeriesList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.currentTarget.elements[0] as HTMLInputElement).value;

    setSeriesList((current) => {
      const filteredList = searchTerm
        ? originalWatchList.current.filter((item) => item.Title.toLowerCase().match(searchTerm.toLowerCase()))
        : originalWatchList.current;
      return {
        ...current,
        results: filteredList,
        totalItems: filteredList.length
      };
    });
  };

  useEffect(() => {
    if (seriesList.checked) return;

    setSeriesList({ results: originalWatchList.current, totalItems: originalWatchList.current.length, checked: true });
  }, [seriesList.checked]);

  return (
    <section className={classes.watchlist}>
      <Backdrop posterUrl={`${process.env.PUBLIC_URL}${isMobile ? '/img/wallpaper_mob.jpg' : '/img/wallpaper.jpg'}`} height="80vh" />
      <div className={`content_container ${classes.watchlist_content}`}>
        <SearchInput filterSeriesList={filterSeriesList} />
        <WatchListItems totalItems={seriesList.totalItems} seriesList={seriesList.results} />
      </div>
    </section>
  );
};

export default WatchList;
