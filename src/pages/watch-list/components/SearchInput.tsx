import React, { FormEvent, useState } from 'react';
import SearchBox from '../../../components/search/SearchBox';
import classes from '../watch-list.module.scss';

type SearchInputProps = {
  filterSeriesList: (e: FormEvent<HTMLFormElement>) => void;
};

const SearchInput = ({ filterSeriesList }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className={classes.watchlist_content_search}>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} submitFn={filterSeriesList} />
    </div>
  );
};

export default SearchInput;
