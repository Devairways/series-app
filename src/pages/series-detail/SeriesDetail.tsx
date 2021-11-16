import React, { useCallback, useEffect, useState } from 'react';
import ApiController from '../../api-services/calls/apiController';
import { SeriesListModel, SingleSeriesResultModel } from '../../api-services/api-models/seriesModels';
import { stringToArray, truncateString } from '../../helpers/stringHelpers';
import Dropdown from '../../components/dropdown/Dropdown';
import classes from './series-detail.module.scss';
import { Backdrop, LoadingSpinner } from '../../components';
import { useParams } from 'react-router-dom';
import WatchListButton from './components/WatchListButton';
import useWindowDimensions from '../../helpers/windowDimensions';

const SeriesDetail = () => {
  const { id } = useParams();
  const { bigBox } = useWindowDimensions();
  const [serieDetails, setSerieDetails] = useState<SingleSeriesResultModel | undefined>(undefined);
  const [fullDescription, setFullDescription] = useState(false);

  const storeItemAsViewed = (series: SingleSeriesResultModel) => {
    const { Title, Year, Poster, imdbID, Type } = series;
    const viewedItems = JSON.parse(localStorage.getItem('recently-viewed') || '[]') as SeriesListModel[];

    if (viewedItems.find((item) => item.imdbID === series.imdbID)) return;

    if (viewedItems.length > 4) {
      viewedItems.shift();
    }
    const newViewedItem = {
      Title,
      Year,
      imdbID,
      Type,
      Poster
    };

    viewedItems.push(newViewedItem);
    localStorage.setItem('recently-viewed', JSON.stringify(viewedItems));
  };

  const getSerieDetails = useCallback(async () => {
    const series = await ApiController.SeriesController.getSingleSeries(id ?? '');

    if (series) {
      setSerieDetails(series);
      storeItemAsViewed(series);
    }
  }, [id]);

  useEffect(() => {
    if (serieDetails || !id) return;
    getSerieDetails();
  }, [serieDetails, getSerieDetails, id]);

  return (
    <section className={classes.seriesdetail}>
      {serieDetails ? (
        <>
          <Backdrop posterUrl={serieDetails?.Poster ?? ''} />
          <div className={`content_container ${classes.seriesdetail_content}`}>
            <div className={classes.seriesdetail_content_header}>
              <img src={serieDetails?.Poster} alt="series-poster" />
              <div>
                <div className={classes.seriesdetail_content_header_info}>
                  <div>
                    <h2>{serieDetails?.Title}</h2>
                    <p>{serieDetails?.Genre}</p>
                    <p>{serieDetails?.Year}</p>
                    <p className={classes.rating}>{`IMDb: ${serieDetails?.imdbRating}`}</p>
                  </div>
                  {bigBox === true && <WatchListButton series={serieDetails} />}
                </div>
                {bigBox === true && (
                  <div className={classes.seriesdetail_content_header_plot}>
                    <h3>Plot</h3>
                    <p className={classes.plot_content}>{serieDetails?.Plot === 'N/A' ? 'No plot description available' : serieDetails?.Plot}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.seriesdetail_content_body}>
              {bigBox === false && (
                <div className={classes.seriesdetail_content_body_section}>
                  <h3>Plot</h3>
                  <p className={classes.plot_content}>
                    {serieDetails?.Plot === 'N/A' ? (
                      'No plot description available'
                    ) : (
                      <>
                        {fullDescription ? serieDetails?.Plot : truncateString(serieDetails?.Plot ?? '', 180)}
                        <span className="blue_text" onClick={() => setFullDescription(!fullDescription)}>
                          {fullDescription ? ' Less' : ' See more'}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              )}
              <div className={classes.seriesdetail_content_body_section}>
                <p className="blue_text">
                  {'Director: '}
                  <span className="grey_text">{serieDetails?.Director}</span>
                </p>
                <p className="blue_text">
                  {'Writer: '}
                  <span className="grey_text">{serieDetails?.Writer}</span>
                </p>
              </div>
              <div className={classes.seriesdetail_content_body_section}>
                <Dropdown title="Extra info">
                  <li>
                    <p className="blue_text">
                      {'Title: '}
                      <span className="grey_text">{serieDetails?.Title}</span>
                    </p>
                  </li>
                  <li>
                    <p className="blue_text">
                      {'Released: '}
                      <span className="grey_text">{serieDetails?.Released}</span>
                    </p>
                  </li>
                  <li>
                    <p className="blue_text">
                      {'Language: '}
                      <span className="grey_text">{serieDetails?.Language}</span>
                    </p>
                  </li>
                  <li>
                    <p className="blue_text">
                      {'Country: '}
                      <span className="grey_text">{serieDetails?.Country}</span>
                    </p>
                  </li>
                  <li>
                    <p className="blue_text">
                      {'Rated: '}
                      <span className="grey_text">{serieDetails?.Rated}</span>
                    </p>
                  </li>
                  <li>
                    <p className="blue_text">
                      {'Total Seasons: '}
                      <span className="grey_text">{serieDetails?.totalSeasons}</span>
                    </p>
                  </li>
                  <li>
                    <p className="blue_text">
                      {'Episode runtime: '}
                      <span className="grey_text">{serieDetails?.Runtime}</span>
                    </p>
                  </li>
                  <li>
                    <p className="blue_text">
                      {'Awards: '}
                      <span className="grey_text">{serieDetails?.Awards}</span>
                    </p>
                  </li>
                </Dropdown>
                <Dropdown title="Cast">
                  {stringToArray(serieDetails?.Actors ?? '').map((actor) => (
                    <li key={actor}>
                      <p className="blue_text">{actor}</p>
                    </li>
                  ))}
                </Dropdown>
              </div>
              {bigBox !== true && (
                <div className={classes.seriesdetail_content_body_section}>
                  <WatchListButton series={serieDetails} />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

export default SeriesDetail;
