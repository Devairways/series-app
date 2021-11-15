import React, { FormEvent, useState } from 'react';
import SearchBox from '../../../components/search/SearchBox';
import classes from '../home.module.scss';

type SearchInputProps = {
  getSeriesList: (e: FormEvent<HTMLFormElement>) => void;
};

const SearchInput = ({ getSeriesList }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className={classes.home_content_search}>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} submitFn={getSeriesList} />
    </div>
  );
};

export default SearchInput;
