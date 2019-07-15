import React from 'react';
import './hotel-list.style.scss';

import HotelCard from '../hotel-card/hotel-card.component';

const HotelList = props => {
  if (props.serverError) {
    return (
      <div className="emptyStateContainerStyle">
        <div className="errorStateContentStyle">
          <h1>Oops! Something went wrong!</h1>
          <p>Please refresh your browser and try again.</p>
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
        <div className="emptyStateContainerStyle">
          <p className="emptyStateContentStyle">There are no hotels that meet your filter criteria.</p>
        </div>
      )
    }

    if (props.sortPriceBy) {
      let sortedHotels = [];
  
      if (props.sortPriceBy === 'ascending') {
        sortedHotels = filteredHotels.sort((a, b) => {
          return a.lowestAveragePrice.amount - b.lowestAveragePrice.amount;
        })
      } else if (props.sortPriceBy === 'descending') {
        sortedHotels = filteredHotels.sort((a, b) => {
          return b.lowestAveragePrice.amount - a.lowestAveragePrice.amount;
        })
      } else {
        sortedHotels = filteredHotels.sort((a, b) => {
          return b.hotelStaticContent.rating - a.hotelStaticContent.rating;
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
        return b.hotelStaticContent.rating - a.hotelStaticContent.rating;
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