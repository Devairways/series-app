import { http } from "../http";
import {
  SeriesListResultModel,
  SingleSeriesResultModel,
} from "../../api-models/seriesModels";

const seriesController = {
  getSingleSeries: (seriesId: string): Promise<SingleSeriesResultModel> =>
    http<SingleSeriesResultModel>({
      request: `${process.env.REACT_APP_OMDB_URL}?i=${seriesId}&type=series&plot=full&apikey=${process.env.REACT_APP_OMDB_APIKEY}`,
      errorMessage: "Failed to fetch series.",
    }),

  getSeriesList: (
    searchterm: string,
    page?: number
  ): Promise<SeriesListResultModel> =>
    http<SeriesListResultModel>({
      request: `${
        process.env.REACT_APP_OMDB_URL
      }?s=${searchterm}&type=series&page=${page ?? 1}&apikey=${
        process.env.REACT_APP_OMDB_APIKEY
      }`,
      errorMessage: "Failed to fetch serieslist.",
    }),
};

export default seriesController;
