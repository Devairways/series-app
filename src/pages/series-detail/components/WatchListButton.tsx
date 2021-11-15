import React, { useEffect, useRef, useState } from 'react';
import { SeriesListModel, SingleSeriesResultModel } from '../../../api-services/api-models/seriesModels';

type WatchListButtonProps = {
  series: SingleSeriesResultModel | undefined;
};

const WatchListButton = ({ series }: WatchListButtonProps) => {
  const [inWatchList, setInWatchList] = useState<boolean>(false);
  const watchListItems = useRef<SeriesListModel[]>(JSON.parse(localStorage.getItem('watch-list') || '[]'));

  const storeItemInWatchList = (seriesItem: SingleSeriesResultModel) => {
    const { Title, Year, Poster, imdbID, Type } = seriesItem;

    if (!watchListItems.current || watchListItems.current.find((item) => item.imdbID === seriesItem.imdbID)) return;

    const newWatchListItem = {
      Title,
      Year,
      imdbID,
      Type,
      Poster
    };

    watchListItems.current.push(newWatchListItem);
    localStorage.setItem('watch-list', JSON.stringify(watchListItems.current));
    setInWatchList(true);
  };

  const removeItemFromWatchList = (itemId: string) => {
    const updatedList = watchListItems.current.filter((item) => item.imdbID !== itemId);

    watchListItems.current = updatedList;
    localStorage.setItem('watch-list', JSON.stringify(watchListItems.current));
    setInWatchList(false);
  };

  useEffect(() => {
    if (!series) return;

    if (watchListItems.current.find((item) => item.imdbID === series?.imdbID)) {
      setInWatchList(true);
    }
  }, [series]);

  return (
    <button
      type="button"
      onClick={() => {
        if (!series) return;
        inWatchList ? removeItemFromWatchList(series.imdbID) : storeItemInWatchList(series);
      }}
    >
      {inWatchList ? 'Remove from watchlist' : 'Add to watchlist'}
    </button>
  );
};

export default WatchListButton;
