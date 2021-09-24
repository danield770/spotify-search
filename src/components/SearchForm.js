import React, { useRef } from 'react';

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
    <form className='form sticky' onSubmit={handleSubmit}>
      <div className='form__search-wpr'>
        <input
          className='form__input'
          type='text'
          placeholder='Search album or artist'
          ref={inputRef}
        />
        <button className='form__btn'>Search</button>
      </div>

      <div className='form__sort-wpr'>
        <label htmlFor='form__sort'>Sort By:</label>
        <select id='form__sort' name='sort' onChange={handleChange}>
          <option value=''>Default</option>
          <option value='name'>Album name</option>
          <option value='artist_name'>Artist name</option>
          <option value='release_date'>Release Date</option>
          <option value='popularity'>Popularity</option>
        </select>
      </div>

      <div className='form__filter-wpr'>
        <label htmlFor='form__filter'>Filter By:</label>
        <select id='form__filter' name='filter' onChange={handleChange}>
          <option value=''>Any time</option>
          <option value={currentYear}>Past year</option>
          <option value={`${currentYear - 1}-${currentYear}`}>
            Past 2 years
          </option>
          <option value={`${currentYear - 4}-${currentYear}`}>
            Past 5 years
          </option>
        </select>
      </div>
    </form>
  );
};

export default SearchForm;
