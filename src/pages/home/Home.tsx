import React, { FormEvent, useRef, useState } from 'react';
import { SeriesListModel } from '../../api-services/api-models/seriesModels';
import ApiController from '../../api-services/calls/apiController';
import { Backdrop } from '../../components';
import useWindowDimensions from '../../helpers/windowDimensions';
import RecentlyViewed from './components/RecentlyViewed';
import SearchInput from './components/SearchInput';
import SearchResultList from './components/SearchResultList';
import classes from './home.module.scss';

const Home = () => {
  const { isMobile } = useWindowDimensions();
  const [seriesList, setSeriesList] = useState<{
    results: SeriesListModel[];
    totalItems: number;
  }>({ results: [], totalItems: 0 });
  const currentSearchTerm = useRef<string>('');
  const abortFetch = useRef<AbortController>();

  const getSeriesList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.currentTarget.elements[0] as HTMLInputElement).value;

    if (abortFetch.current) {
      abortFetch.current.abort();
    }
    abortFetch.current = new AbortController();

    const serieslistResult = await ApiController.SeriesController.getSeriesList(searchTerm, undefined, abortFetch.current.signal);
    if (serieslistResult.totalResults) {
      currentSearchTerm.current = searchTerm;
      setSeriesList({
        results: serieslistResult.Search,
        totalItems: Number(serieslistResult.totalResults)
      });
    }
  };

  return (
    <section className={classes.home}>
      <Backdrop posterUrl={`${process.env.PUBLIC_URL}${isMobile ? '/img/wallpaper_mob.jpg' : '/img/wallpaper.jpg'}`} height="80vh" />
      <div className={`content_container ${classes.home_content}`}>
        <SearchInput getSeriesList={getSeriesList} />
        {seriesList.results.length > 0 && (
          <SearchResultList
            currentSearchTerm={currentSearchTerm}
            totalItems={seriesList.totalItems}
            seriesList={seriesList.results}
            setSeriesList={setSeriesList}
          />
        )}
        <RecentlyViewed />
      </div>
    </section>
  );
};

export default Home;
