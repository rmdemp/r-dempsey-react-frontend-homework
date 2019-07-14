import React from 'react';

import HotelCard from '../hotel-card/hotel-card.component';

const HotelList = props => {
  const emptyStateContainerStyle = {
    background: 'white',
    display: 'grid',
    borderRadius: '2px',
    overflow: 'hidden',
    boxShadow: '0 2px 7px -2px rgba(0, 0, 0, 0.12)',
  }

  const emptyStateContentStyle = {
    margin: 'auto',
    textAlign: 'center',
    fontWeight: '500',
  }

  const errorStateContentStyle = {
    margin: 'auto',
    textAlign: 'center',
  }

  if (props.serverError) {
    return (
      <div style={emptyStateContainerStyle}>
        <div style={errorStateContentStyle}>
          <h1 style={{ "fontWeight": "600", "fontSize" : "24px", "paddingBottom" : "10px"}}>Oops! Something went wrong!</h1>
          <p style={{ "fontWeight" : "300", "fontSize" : "18px"}}>Please refresh your browser and try again.</p>
        </div>
      </div>
    )
  }

  if (props.filterBy) {
    let searchTerm = new RegExp(props.filterBy, 'gi');
    let filteredHotels = [];

    props.hotels.forEach(hotel => {
      if (searchTerm.test(hotel.hotelStaticContent.name)) {
        filteredHotels.push(hotel);
      }
    })

    if (!filteredHotels.length) {
      return (
        <div style={emptyStateContainerStyle}>
          <p style={emptyStateContentStyle}>There are no hotels that meet your filter criteria.</p>
        </div>
      )
    }

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

  if (props.sortPriceBy) {
    let sortedHotels = [];

    if (props.sortPriceBy === 'ascending') {
      sortedHotels = props.hotels.sort((a, b) => {
        return a.lowestAveragePrice.amount - b.lowestAveragePrice.amount;
      })
    } else if (props.sortPriceBy === 'descending') {
      sortedHotels = props.hotels.sort((a, b) => {
        return b.lowestAveragePrice.amount - a.lowestAveragePrice.amount;
      })
    } else {
      sortedHotels = props.hotels.sort((a, b) => {
        return a.rewards.miles - b.rewards.miles;
      });
    }

    return (
      <div className="hotel-list">
        {
          sortedHotels.map(hotel => {
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