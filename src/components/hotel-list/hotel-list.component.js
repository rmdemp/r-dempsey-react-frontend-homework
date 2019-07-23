import React from 'react';
import './hotel-list.style.scss';

import HotelCard from '../hotel-card/hotel-card.component';

// filter by name
const filterByName = (arr, filterCriteria) => {
  const searchTerm = new RegExp(filterCriteria, 'i');
  let filteredArray = [];

  arr.forEach(el => {
    if (searchTerm.test(el.hotelStaticContent.name)) {
      filteredArray.push(el);
    }
  })

  return filteredArray;
}

// sort by price ascending
const sortByPriceAscending = arr => {
  return arr.sort((a, b) => {
    return a.lowestAveragePrice.amount - b.lowestAveragePrice.amount; 
  })
}

// sort by price descending
const sortByPriceDescending = arr => {
  return arr.sort((a, b) => {
    return b.lowestAveragePrice.amount - a.lowestAveragePrice.amount;
  })
}

// sort by recommended
const sortByRecommended = arr => {
  return arr.sort((a, b) => {
    return b.hotelStaticContent.rating - a.hotelStaticContent.rating;
  })
}

// sort hotels by ascending, descending, or default to recommended
const sortHotels = (arr, sortCriteria = null) => {
  let sortedHotels = [];
    
  if (sortCriteria === 'ascending') {
    sortedHotels = sortByPriceAscending(arr);
  } else if (sortCriteria === 'descending') {
    sortedHotels = sortByPriceDescending(arr);
  } else {
    sortedHotels = sortByRecommended(arr);
  }

  return sortedHotels;
}

// sort by neighborhood
const sortByNeighborhood = (arr, neighborhood) => {
  return arr.filter(el => { return el.hotelStaticContent.neighborhoodName === neighborhood });
}

// component definition
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

  if (props.neighborhood) {
    let hotelsByNeighborhood = sortByNeighborhood(props.hotels, props.neighborhood);

    if (props.filterBy) {
      let filteredHotels = filterByName(hotelsByNeighborhood, props.filterBy);
  
      if (!filteredHotels.length) {
        return (
          <div className="emptyStateContainerStyle">
            <p className="emptyStateContentStyle">There are no hotels that meet your filter criteria.</p>
          </div>
        )
      }
  
      if (props.sortPriceBy) {
        let sortedHotels = sortHotels(filteredHotels, props.sortPriceBy);
    
        return (
          <div className="hotel-list">
            {
              sortedHotels.map(hotel => {
                return (
                  <HotelCard hotel={hotel} key={hotel.id} />
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
                <HotelCard hotel={hotel} key={hotel.id} />
              )
            })
          }
        </div>
      )
    }

    if (props.sortPriceBy) {
      let sortedHotels = sortHotels(hotelsByNeighborhood, props.sortPriceBy);
  
      return (
        <div className="hotel-list">
          {
            sortedHotels.map(hotel => {
              return (
                <HotelCard hotel={hotel} key={hotel.id} />
              )
            })
          }
        </div>
      )
    }
  
    return (
      <div className="hotel-list">
        {
          hotelsByNeighborhood.map(hotel => {
            return (
              <HotelCard hotel={hotel} key={hotel.id} />
            )
          })
        }
      </div>
    )
  }

  if (props.filterBy) {
    let filteredHotels = filterByName(props.hotels, props.filterBy);

    if (!filteredHotels.length) {
      return (
        <div className="emptyStateContainerStyle">
          <p className="emptyStateContentStyle">There are no hotels that meet your filter criteria.</p>
        </div>
      )
    }

    if (props.sortPriceBy) {
      let sortedHotels = sortHotels(filteredHotels, props.sortPriceBy);
  
      return (
        <div className="hotel-list">
          {
            sortedHotels.map(hotel => {
              return (
                <HotelCard hotel={hotel} key={hotel.id} />
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
              <HotelCard hotel={hotel} key={hotel.id} />
            )
          })
        }
      </div>
    )
  }

  if (props.sortPriceBy) {
    let hotels = props.hotels;
    let sortedHotels = sortHotels(hotels, props.sortPriceBy);

    return (
      <div className="hotel-list">
        {
          sortedHotels.map(hotel => {
            return (
              <HotelCard hotel={hotel} key={hotel.id} />
            )
          })
        }
      </div>
    )
  }

  if (props.neighborhood) {
    let hotelsByNeighborhood = sortByNeighborhood(props.hotel, props.neighborhood);
  
    return (
      <div className="hotel-list">
        {
          hotelsByNeighborhood.map(hotel => {
            return (
              <HotelCard hotel={hotel} key={hotel.id} />
            )
          })
        }
      </div>
    )
  }

  const hotels = props.hotels.map(hotel => {
      return (
        <HotelCard hotel={hotel} key={hotel.id} />
      )
    });
  
    return (
      <div className="hotel-list">
        { hotels }
      </div>
    )

}

export default HotelList;