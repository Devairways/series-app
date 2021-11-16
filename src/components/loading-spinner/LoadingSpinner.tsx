import React from 'react';
import img from './img/loading.gif';
import classes from './loading-spinner.module.scss';

const LoadingSpinner = () => (
  <div className={classes.loading_spinner}>
    <img src={img} alt="loading" />
  </div>
);

export default LoadingSpinner;
