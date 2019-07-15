import React from 'react';
import { shallow } from 'enzyme';
import HotelList from './hotel-list.component';

describe('HotelList', () => {
    const wrapper = shallow(<HotelList />);

    it('renders the component', () => {
        expect(wrapper.find('.hotel-list').exists()).toBe(true);
    });
});