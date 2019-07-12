import axios from 'axios';

class HotelResultService {
    get() {
        return axios
            .get('https://homework-app.rocketmiles.com/fe-homework/rates')
            .then(response => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log('error.response.data.message', error.response.data.message);
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.error('Error', error.message);
                }
            })
    }
}

const hotelResultService = new HotelResultService();

export default hotelResultService;