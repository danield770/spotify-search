import React from 'react';
import styles from './Header.module.css';

const Header = ({ hasData }) => {
  return (
    <h1
      className={`${styles['search-header']} ${
        hasData
          ? `sticky ${styles['search-header--small']}`
          : styles['search-header--large']
      } `}
    >
      <span aria-hidden='true'>
        Sp<span className={styles['icon-logo']}>o</span>tify
      </span>
      <span className='offscreen'>Spotify</span>&nbsp;
      <span>Search</span>
    </h1>
  );
};
export default Header;
