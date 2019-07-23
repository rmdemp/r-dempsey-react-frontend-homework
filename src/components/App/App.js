import React, { useState, useEffect } from 'react';
import './App.style.scss'

import hotelResultService from '../../services/hotel-result/hotel-result.service';
import HotelList from '../hotel-list/hotel-list.component';
import HotelFilter from '../hotel-filter/hotel-filter.component';

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [filterBy, setFilterBy] = useState('');
    const [sortPriceBy, setSortPriceBy] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        hotelResultService.get().then(response => {
            if (response) { setHotels(response.results.hotels); }
        }).catch(err => setError(err.message));
    }, []);

    return (
        <div className="app-container">
            <div className="content">
                <div>
                    <HotelFilter
                        hotels={hotels}
                        onNameFilterChange={setFilterBy}
                        onPriceSortByChange={setSortPriceBy}
                        onNeighborhoodChange={setNeighborhood}
                    />
                </div>

                <HotelList
                    hotels={hotels}
                    filterBy={filterBy}
                    sortPriceBy={sortPriceBy}
                    neighborhood={neighborhood}
                    serverError={error}
                />
            </div>
        </div>
    )
}

export default App;
