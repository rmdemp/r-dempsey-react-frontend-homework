import React from 'react';

const HotelFilter = props => {
  return (
    <div className="filters">
        Hotel name
        <input type="text" className="input" maxLength={1}/>
        Price
        <select name="" className="select">
            <option value="">Recommended</option>
            <option value="">Price low-to-high</option>
            <option value="">Price high-to-low</option>
        </select>
        <button className="button">Reset</button>
    </div>
  );
}

export default HotelFilter;