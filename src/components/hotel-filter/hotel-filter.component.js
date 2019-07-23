import React, { useState, useEffect, useRef } from 'react';

const HotelFilter = props => {
  const [sortPriceBy, setSortPriceBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const neighborhoods = {};

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
    selectRef.current.value = 'recommended';
    setFilterBy('');
    setSortPriceBy('recommended');
  }

  const neighborhoodNames = props.hotels.map(hotel => {
    return hotel.hotelStaticContent.neighborhoodName;
  });

  neighborhoodNames.forEach(el => {
    if (!neighborhoods[el]) {
      neighborhoods[el] = 1;
    } else {
      neighborhoods[el]++;
    }
  });

  return (
    <div className="filters">
        Hotel name
        <input ref={inputRef} type="text" className="input" onChange={(event) => handleNameFilterChange(event)}/>
        Price
        <select ref={selectRef} name="" className="select" onChange={(event) => handlePriceSortChange(event)}>
            <option value="recommended">Recommended</option>
            <option value="ascending">Price low-to-high</option>
            <option value="descending">Price high-to-low</option>
        </select>
        Neighborhood
        <select className="select" onChange={(event) => console.log(event.target.value)}>
            {
              Object.entries(neighborhoods).map(([key, value]) => {
                return (
                  <option value={key}>{key} ({value})</option>
                )
              })
            }
        </select>
        <button className="button" onClick={() => handleReset()}>Reset</button>
    </div>
  );
}

export default HotelFilter;