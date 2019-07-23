import React, { useState, useEffect, useRef } from 'react';

const HotelFilter = props => {
  const [sortPriceBy, setSortPriceBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const inputRef = useRef(null);
  const sortSelectRef = useRef(null);
  const neighborhoodSelectRef = useRef(null);
  const neighborhoods = {};

  useEffect(() => {
    props.onPriceSortByChange(sortPriceBy);
    props.onNameFilterChange(filterBy);
    props.onNeighborhoodChange(neighborhood);
  })

  const handlePriceSortChange = (e) => {
    setSortPriceBy(e.target.value);
  }

  const handleNameFilterChange = (e) => {
    setFilterBy(e.target.value);
  }

  const handleNeighborhoodChange = (e) => {
    setNeighborhood(e.target.value);
  }

  const handleReset = () => {
    inputRef.current.value = '';
    sortSelectRef.current.value = null;
    neighborhoodSelectRef.current.value = null;
    setFilterBy('');
    setSortPriceBy('');
    setNeighborhood('');
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
        <select ref={sortSelectRef} name="" className="select" onChange={(event) => handlePriceSortChange(event)}>
            <option value="recommended">Recommended</option>
            <option value="ascending">Price low-to-high</option>
            <option value="descending">Price high-to-low</option>
        </select>
        Neighborhood
        <select ref={neighborhoodSelectRef} className="select" onChange={(event) => handleNeighborhoodChange(event)}>
            {
              Object.entries(neighborhoods).map(([key, value]) => {
                return (
                  <option key={key[0]+key[2]+value} value={key}>{key} ({value})</option>
                )
              })
            }
        </select>
        <button className="button" onClick={() => handleReset()}>Reset</button>
    </div>
  );
}

export default HotelFilter;