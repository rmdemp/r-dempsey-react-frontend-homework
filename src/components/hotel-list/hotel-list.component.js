import React from 'react';

import HotelCard from '../hotel-card/hotel-card.component';

const HotelList = props => {
  const hotels = props.hotels.map(hotel => {
      return (
        <HotelCard hotel={hotel} />
      )
    });
  
  return (
    <div className="hotel-list">
      { hotels }
    </div>
  )
}

export default HotelList;