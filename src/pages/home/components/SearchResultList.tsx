import React from 'react';
import { SeriesListModel } from '../../../api-services/api-models/seriesModels';
import ApiController from '../../../api-services/calls/apiController';
import { SeriesCard } from '../../../components';
import classes from '../home.module.scss';
import PaginationComponent from './PaginationComponent';

type SearchResultListProps = {
  totalItems: number;
  seriesList: SeriesListModel[];
  setSeriesList: React.Dispatch<
    React.SetStateAction<{
      results: SeriesListModel[];
      totalItems: number;
    }>
  >;
  currentSearchTerm: React.MutableRefObject<string>;
};

const SearchResultList = ({ totalItems, seriesList, setSeriesList, currentSearchTerm }: SearchResultListProps) => {
  const getUpdatedSeriesList = async (pageNumber: number) => {
    const serieslistResult = await ApiController.SeriesController.getSeriesList(currentSearchTerm.current, pageNumber);

    if (serieslistResult.totalResults) {
      setSeriesList((current) => ({ ...current, results: serieslistResult.Search }));
    }
  };
  return (
    <div className={classes.home_content_list}>
      <h2>Searchlist</h2>
      <p className={classes.count}>{`Total items: ${totalItems}`}</p>
      <div className={classes.home_content_list_body}>
        {seriesList.map((series) => (
          <SeriesCard key={series.imdbID} series={series} />
        ))}
      </div>
      <PaginationComponent totalItems={totalItems} getSeriesList={getUpdatedSeriesList} />
    </div>
  );
};

export default SearchResultList;
