import React, { FormEvent } from 'react';
import classes from './search-box.module.scss';

type SearchBoxProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  submitFn: (e: FormEvent<HTMLFormElement>) => void;
};

const SearchBox = ({ searchTerm, setSearchTerm, submitFn }: SearchBoxProps) => (
  <form onSubmit={submitFn} className={classes.searchbox}>
    <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} data-testid="search-input" placeholder="Find by title.." />
    <button type="submit" data-testid="search-button">
      Search
    </button>
  </form>
);

export default SearchBox;
