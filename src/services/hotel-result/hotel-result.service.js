import axios from 'axios';

class HotelResultService {
    get() {
        return axios
            .get('https://homework-app.rocketmiles.com/fe-homework/rates')
            .then(response => response.data)
            .catch((error) => {
                if (error.response) {
                    error.response.data.message;
                } else if (error.request) {
                    error.request;
                } else {
                    error.message;
                }
            })
    }
}

const hotelResultService = new HotelResultService();

export default hotelResultService;