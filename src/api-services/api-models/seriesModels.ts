export interface SingleSeriesResultModel {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: RatingsModel[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons: string;
}

export interface RatingsModel {
  Source: string;
  Value: string;
}

export interface SeriesListResultModel {
  Search: SeriesListModel[];
  totalResults: string;
  Response: string;
}

export interface SeriesListModel {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
