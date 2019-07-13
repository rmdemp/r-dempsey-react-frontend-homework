import React, { useState } from 'react';

const HotelFilter = props => {
  const [value, setValue] = useState('');

  return (
    <div className="filters">
        Hotel name
        <input type="text" className="input" maxLength={1}/>
        Price
        <select name="" className="select" value={value} onChange={(event) => setValue(event.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="low">Price low-to-high</option>
            <option value="high">Price high-to-low</option>
        </select>
        <button className="button">Reset</button>
    </div>
  );
}

export default HotelFilter;