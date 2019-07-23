import React from 'react';
import './hotel-list.style.scss';

import HotelCard from '../hotel-card/hotel-card.component';

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

const sortByPriceAscending = arr => {
  return arr.sort((a, b) => {
    return a.lowestAveragePrice.amount - b.lowestAveragePrice.amount; 
  })
}

const sortByPriceDescending = arr => {
  return arr.sort((a, b) => {
    return b.lowestAveragePrice.amount - a.lowestAveragePrice.amount;
  })
}

const sortByRecommended = arr => {
  return arr.sort((a, b) => {
    return b.hotelStaticContent.rating - a.hotelStaticContent.rating;
  })
}

const sortHotelsByPrice = (arr, sortCriteria = null) => {
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

const filterByNeighborhood = (arr, neighborhood) => {
  return arr.filter(el => { return el.hotelStaticContent.neighborhoodName === neighborhood });
}

// component definition
const HotelList = props => {
  let filteredAndSortedHotels = [];

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

  if (props.sortPriceBy) {
    if (props.neighborhood) {
      if (props.filterBy) {
        filteredAndSortedHotels = sortHotelsByPrice(filterByName(filterByNeighborhood(props.hotels, props.neighborhood), props.filterBy), props.sortPriceBy);
      }
      
      filteredAndSortedHotels = sortHotelsByPrice(filterByNeighborhood(props.hotels, props.neighborhood), props.sortPriceBy);
    }

    if (props.filterBy) {
      filteredAndSortedHotels = sortHotelsByPrice(filterByName(props.hotels, props.filterBy), props.sortPriceBy);
    }

    filteredAndSortedHotels = sortHotelsByPrice(props.hotels, props.sortPriceBy);
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

    if (props.neighborhood) {
      filteredAndSortedHotels = filterByNeighborhood(filteredHotels, props.neighborhood);
    }

    if (props.sortPriceBy) {
      filteredAndSortedHotels = sortHotelsByPrice(filteredHotels, props.sortPriceBy);
    }

    filteredAndSortedHotels = filteredHotels;
  }

  if (props.neighborhood) {
    let hotelsByNeighborhood = filterByNeighborhood(props.hotels, props.neighborhood);

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
        filteredAndSortedHotels = sortHotelsByPrice(filteredHotels, props.sortPriceBy);
      }
  
      filteredAndSortedHotels = filteredHotels;
    }

    if (props.sortPriceBy) {
      filteredAndSortedHotels = sortHotelsByPrice(hotelsByNeighborhood, props.sortPriceBy);
    }

    filteredAndSortedHotels = hotelsByNeighborhood;
  }

  let hotels;

  if (filteredAndSortedHotels.length) {
    hotels = filteredAndSortedHotels.map(hotel => {
      return (
        <HotelCard hotel={hotel} key={hotel.id} />
      )
    });
  
    return (
      <div className="hotel-list">
        { hotels }
      </div>
    )
  } else {
    hotels = props.hotels.map(hotel => {
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
}

export default HotelList;