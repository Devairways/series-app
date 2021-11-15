import React from 'react';
import { SeriesListModel } from '../../../api-services/api-models/seriesModels';
import { SeriesCard } from '../../../components';
import classes from '../watch-list.module.scss';

type WatchListItemsProps = {
  totalItems: number;
  seriesList: SeriesListModel[];
};

const WatchListItems = ({ totalItems, seriesList }: WatchListItemsProps) => (
  <div className={classes.watchlist_content_list}>
    <h2>Watchlist</h2>
    <p className={classes.count} data-testid="counter">{`Total items: ${totalItems}`}</p>
    <div className={classes.watchlist_content_list_body}>
      {seriesList.map((series) => (
        <SeriesCard key={series.imdbID} series={series} />
      ))}
    </div>
  </div>
);

export default WatchListItems;
