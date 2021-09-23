import React, { useState, useEffect, useRef } from 'react';

const SearchForm = ({ onFormSubmit, onSort }) => {
  const inputRef = useRef();
  const currentYear = new Date().getFullYear();
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = { text: inputRef.current.value };
    onFormSubmit(input);
  };
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    console.log('selected: ', target.name, value);
    if (target.name === 'sort') {
      onSort(value);
    } else {
      const input = { text: inputRef.current.value, [target.name]: value };
      onFormSubmit(input);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Search album or atrist' ref={inputRef} />
      <button>Search</button>
      <span>Sort By:</span>
      <select name='sort' onChange={handleChange}>
        <option value=''>Default</option>
        <option value='name'>Album name</option>
        <option value='artists,0,name'>Artist name</option>
        <option value='album,release_date'>Release Date</option>
        <option value='popularity'>Popularity</option>
      </select>
      <span>Filter By:</span>
      <select name='filter' onChange={handleChange}>
        <option value=''>Any time</option>
        <option value={currentYear}>Past year</option>
        <option value={`${currentYear - 1}-${currentYear}`}>
          Past 2 years
        </option>
        <option value={`${currentYear - 4}-${currentYear}`}>
          Past 5 years
        </option>
      </select>
    </form>
  );
};

export default SearchForm;
