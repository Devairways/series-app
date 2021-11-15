import React, { useMemo, useState } from 'react';
import classes from '../home.module.scss';

type PaginationComponentProps = {
  totalItems: number;
  getSeriesList: (pageNumber: number) => void;
};

const PaginationComponent = ({ totalItems, getSeriesList }: PaginationComponentProps) => {
  const [paginationData, setPaginationData] = useState<{ totalPages: number[]; current: number }>({ totalPages: [], current: 0 });

  // eslint-disable-next-line
  const createPaginationComponent = useMemo(() => {
    const totalPages = Math.round(totalItems / 10);
    const numbersArray = [];
    for (let step = 1, total = totalPages; step <= total; step += 1) {
      numbersArray.push(step);
    }
    setPaginationData({ totalPages: numbersArray, current: 1 });
  }, [totalItems]);

  const onBtnClick = (pageNumber: number) => {
    if (pageNumber === paginationData.current) return;

    setPaginationData((current) => ({ ...current, current: pageNumber }));
    getSeriesList(pageNumber);
  };

  return (
    <div className={classes.home_content_pagination}>
      <span onClick={() => onBtnClick(paginationData.current - 1)}>{'<'}</span>
      {paginationData.totalPages.map((pageNumber): JSX.Element | undefined => {
        const currentPage = paginationData.current;
        if ((currentPage && pageNumber > currentPage + 3) || pageNumber < currentPage - 4) return;

        return (
          <span
            key={pageNumber}
            className={paginationData.current === pageNumber ? classes.home_content_pagination_active : ''}
            onClick={() => onBtnClick(pageNumber)}
          >
            {pageNumber}
          </span>
        );
      })}
      {paginationData.current + 4 < paginationData.totalPages.length && <span>...</span>}
      <span onClick={() => onBtnClick(paginationData.current + 1)}>{'>'}</span>
    </div>
  );
};

export default PaginationComponent;
