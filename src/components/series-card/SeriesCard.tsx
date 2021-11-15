import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SeriesListModel } from '../../api-services/api-models/seriesModels';
import classes from './series-card.module.scss';

type SeriesCardProps = {
  series: SeriesListModel;
};

const SeriesCard = ({ series }: SeriesCardProps) => {
  const navigate = useNavigate();

  const navigateTo = (itemId: string) => {
    navigate(`/series/${itemId}`);
  };
  return (
    <div className={classes.series_card}>
      <div
        className={classes.series_card_content}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(82, 82, 82, 0.12), rgba(23, 27, 34, 1)),url(${
            series.Poster !== 'N/A' ? series.Poster : `${process.env.PUBLIC_URL}/img/no_poster.png`
          })`
        }}
        key={series.imdbID}
        onClick={() => navigateTo(series.imdbID)}
      >
        <div className={classes.series_card_content_info}>
          <h3>{series.Title}</h3>
          <p>{series.Year}</p>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
