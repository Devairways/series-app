import React, { useEffect, useState } from 'react';
import { SeriesListModel } from '../../../api-services/api-models/seriesModels';
import { SeriesCard } from '../../../components';
import classes from '../home.module.scss';

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<SeriesListModel[]>([]);

  useEffect(() => {
    const viewedItems = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
    if (viewedItems) setRecentlyViewed(viewedItems);
  }, []);

  return (
    <div className={classes.home_content_list}>
      <h2>Recently viewed</h2>
      <div className={classes.home_content_list_body}>
        {recentlyViewed.length > 0 ? recentlyViewed?.map((series) => <SeriesCard key={series.imdbID} series={series} />) : 'No views yet'}
      </div>
    </div>
  );
};

export default RecentlyViewed;
