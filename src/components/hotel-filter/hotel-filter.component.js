import React, { useState, useEffect } from 'react';

const HotelFilter = props => {
  const [sortPriceBy, setSortPriceBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

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

  return (
    <div className="filters">
        Hotel name
        <input type="text" className="input" onChange={(event) => handleNameFilterChange(event)}/>
        Price
        <select name="" className="select" onChange={(event) => handlePriceSortChange(event)}>
            <option value="recommended">Recommended</option>
            <option value="ascending">Price low-to-high</option>
            <option value="descending">Price high-to-low</option>
        </select>
        <button className="button" onClick={(event) => handleReset(event)}>Reset</button>
    </div>
  );
}

export default HotelFilter;