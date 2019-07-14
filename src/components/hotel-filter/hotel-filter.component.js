import React, { useState, useEffect, useRef } from 'react';

const HotelFilter = props => {
  const [sortPriceBy, setSortPriceBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    props.onPriceSortByChange(sortPriceBy);
    props.onNameFilterChange(filterBy);
  })

  const handlePriceSortChange = (e) => {
    setSortPriceBy(e.target.value);
  }

  const handleNameFilterChange = (e) => {
    setFilterBy(e.target.value);
  }

  const handleReset = () => {
    inputRef.current.value = '';
    setFilterBy('');
    setSortPriceBy('');
  }

  return (
    <div className="filters">
        Hotel name
        <input ref={inputRef} type="text" className="input" onChange={(event) => handleNameFilterChange(event)}/>
        Price
        <select name="" className="select" onChange={(event) => handlePriceSortChange(event)}>
            <option value="recommended">Recommended</option>
            <option value="ascending">Price low-to-high</option>
            <option value="descending">Price high-to-low</option>
        </select>
        <button className="button" onClick={() => handleReset()}>Reset</button>
    </div>
  );
}

export default HotelFilter;