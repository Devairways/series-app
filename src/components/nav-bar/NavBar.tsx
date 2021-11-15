import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './nav-bar.module.scss';

const NavBar = () => (
  <header className={classes.navbar}>
    <nav className={classes.navbar_links}>
      <NavLink to="/" className={(navData) => (navData.isActive ? classes.navbar_links_active : '')}>
        <h1>Home</h1>
      </NavLink>
      <NavLink to="/watchlist" className={(navData) => (navData.isActive ? classes.navbar_links_active : '')}>
        <h1>Watchlist</h1>
      </NavLink>
    </nav>
  </header>
);

export default NavBar;
