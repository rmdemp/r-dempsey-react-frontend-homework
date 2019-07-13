import React from 'react';

import HotelCard from '../hotel-card/hotel-card.component';

const HotelList = props => {
  if (props.filterBy) {
    let searchTerm = new RegExp(props.filterBy, 'gi');
    let filteredHotels = [];

    props.hotels.forEach(hotel => {
      if (searchTerm.test(hotel.hotelStaticContent.name)) {
        filteredHotels.push(hotel);
      }
    })

    return (
      <div className="hotel-list">
        {
          filteredHotels.map(hotel => {
            return (
              <HotelCard hotel={hotel} />
            )
          })
        }
      </div>
    )
  }

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