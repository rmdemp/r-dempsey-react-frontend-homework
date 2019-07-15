import React from 'react';
import { shallow } from 'enzyme';
import HotelFilter from './hotel-filter.component';

describe('HotelFilter', () => {
    const wrapper = shallow(<HotelFilter />);

    it('renders the component', () => {
        expect(wrapper.find('.filters').exists()).toBe(true);
    });
});