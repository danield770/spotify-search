import React from 'react';
const Header = () => {
  return (
    <h1 className='search-header sticky'>
      <span aria-hidden='true'>
        Sp<span className='icon-logo'>o</span>tify
      </span>
      <span className='offscreen'>Spotify</span>
      <span className='icon-search'>Search</span>
    </h1>
  );
};
export default Header;
